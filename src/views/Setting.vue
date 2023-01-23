<script setup lang="ts">
import type { HttpAPI } from '@/types/api';
import type { Category } from '@/types/category';
import type { Product } from '@/types/product';
import type { Setting, Settings, SettingTypes } from '@/types/setting';
import { parse } from '@vue/compiler-dom';
import { mapActions } from 'pinia';
import { ref, inject, onMounted, computed } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next'

const categoriesAPI: HttpAPI | undefined  = inject('categoriesAPI')
const productsAPI: HttpAPI | undefined  = inject('productsAPI')
const settingsAPI: HttpAPI | undefined  = inject('settingsAPI')

const sortByList = ref([
  'created_at',
  'name',
  'code'
])

type ProductCategory = {
  category_id: number,
  list: Array<Product>
}

const sortByMethods = ref(['ascending', 'descending'])
const sortBy = ref('created_at')
const sortMethod = ref('ascending')

const selectedCategory = ref<number>()
const productCategoryList = ref<Array<ProductCategory>>([])
const selectedProduct = ref<Product>()

const products = ref<Array<Product>>([])
const categories = ref<Array<Category>>([])
const productByCategory = computed(() => {
  return products.value.filter((item: Product) => {
    return item.category_id === selectedCategory.value && !selectedListByCategory.value.find((itemOnSelectedList) => itemOnSelectedList.id === item.id)
  }).map((item: Product) => ({ ...item, diplay_name: `${item.name}-${item.code}` }))
})

const selectedListByCategory = computed<Array<Product>>({
  get: () => {
    return (productCategoryList.value?.find((item: ProductCategory) => item.category_id === selectedCategory.value) ?? { list: []}).list
  },
  set: (val) => {
    const productCategory: ProductCategory | undefined = productCategoryList.value.find((item: ProductCategory) => item.category_id === selectedCategory.value)
    if (productCategory) {
      productCategory.list = val
      productCategoryList.value = productCategoryList.value.filter((item: ProductCategory) => item.category_id !== productCategory?.category_id)
      productCategoryList.value.push(productCategory)
    }
  }
})

onMounted(async () => {
  await productsAPI?.get()
    .then(res => {
      products.value = [...res.data]
    })
  await categoriesAPI?.get()
    .then(res => {
      categories.value = [...res.data]
    })
  await settingsAPI?.get()
    .then(res => {
      setData(res.data)
    })
})

function addToList() {
  if (selectedCategory.value && selectedProduct.value) {
    const productCategory: ProductCategory = {
      category_id: selectedCategory.value,
      list: [selectedProduct.value]
    }

    let exists = productCategoryList.value.find((item: ProductCategory) => item.category_id === productCategory.category_id)
    if (exists) {
      exists.list = [...exists.list, selectedProduct.value]
      productCategoryList.value = productCategoryList.value.filter((item: ProductCategory) => item.category_id !== exists?.category_id)
      productCategoryList.value.push(exists)
    } else {
      productCategoryList.value.push(productCategory)
    }
    selectedProduct.value = undefined
  }
}

function onChipClose(id: number) {
  const productCategory: ProductCategory | undefined = productCategoryList.value.find((item: ProductCategory) => item.category_id === selectedCategory.value)
  if (productCategory) {
    productCategory.list = productCategory.list.filter((item: Product) => item.id !== id)
    productCategoryList.value = productCategoryList.value.filter((item: ProductCategory) => item.category_id !== productCategory?.category_id)
    productCategoryList.value.push(productCategory)
  }
}

function save(type: SettingTypes) {
  let payload: {type: string, value: string | Array<any> | object} = { type: '', value: ''}
  switch (type) {
    case 'product-sort':
      payload = {
        type,
        value: {
          sortBy: sortBy.value,
          sortMethod: sortMethod.value
        }
      }
      break;
    case 'product-category':
      payload = {
        type,
        value: productCategoryList.value.map(productCategory => {
          const productCategoryToSave = {
            ...productCategory,
            list: productCategory.list.map(product => product.id)
          }
          return productCategoryToSave
        }).filter(productCategory => {
          return productCategory.list.length > 0
        })
      }
      break;
    default:
      break;
  }
  if (!!payload.type && !!payload.value) {
    payload.value = JSON.stringify(payload.value)
    settingsAPI?.post(payload)
  }
}

function setData(data: Settings) {
  data.forEach(item => {
    if (item.type === 'product-sort') {
      setProductSort(item)
    } else if (item.type === 'product-category') {
      setProductCategoryList(item)
    }
  })
}

function setProductSort(data: Setting) {
  const parsed = JSON.parse(data.value)
  sortMethod.value = parsed.sortMethod
  sortBy.value = parsed.sortBy
}

function setProductCategoryList(data: Setting) {
  const parsed = JSON.parse(data.value)
  productCategoryList.value = parsed.map((item: any) => {
    const productCategory: ProductCategory = {
      category_id: item.category_id,
      list: products.value.filter(product => {
        return item.list.includes(product.id)
      })
    }

    return productCategory
  })
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <div class="d-flex justify-space-between">
              Settings
            </div>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row class="my-3">
                <h3><strong>Product</strong></h3>
                <v-col>
                  <hr>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="2">
                  Sort By: 
                </v-col>
                <v-col md="5">
                  <v-autocomplete v-model="sortBy" :items="sortByList" />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="2">
                  Sort method: 
                </v-col>
                <v-col md="5">
                  <v-autocomplete v-model="sortMethod" :items="sortByMethods" />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="2">
                </v-col>
                <v-col md="5">
                  <v-btn @click="save('product-sort')"> 
                    Save
                  </v-btn>
                </v-col>
              </v-row>

              <v-row class="my-3">
                <h3><strong>Category Product</strong></h3>
                <v-col>
                  <hr>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="2">
                  Category: 
                </v-col>
                <v-col md="5">
                  <v-autocomplete v-model="selectedCategory" :items="categories" item-value="id" item-title="name" />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="2">
                  Add Product: 
                </v-col>
                <v-col md="5" class="d-flex align-center">
                  <v-autocomplete v-model="selectedProduct" :items="productByCategory" item-title="display_name" return-object />
                  <v-btn @click="addToList()">
                    Add
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="2">
                  List Product: 
                </v-col>
                <v-col md="5">
                  <VueDraggableNext v-model="selectedListByCategory">
                    <v-chip
                      v-for="data in (selectedListByCategory as Array<Product>)"
                      style="margin: 5px 0;"
                      :key="data.id"
                      closable
                      color="cyan"
                      label
                      :data-id="data.id"
                      @click:close="onChipClose(data.id)"
                    >
                      <v-icon start icon="mdi-table-chair" />
                      {{ data.name }} - {{ data.code }} ## {{ data.id }}
                    </v-chip>
                  </VueDraggableNext>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="2">
                </v-col>
                <v-col md="5">
                  <v-btn @click="save('product-category')"> 
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.action {
  display: flex;
  gap: 5px;
}
</style>