<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import Filter from '@/components/Filter.vue';
import type { HttpAPI } from '@/types/api';
import type { ProductFilter } from '@/types/product';
import { computed } from '@vue/reactivity';
import { inject, onMounted, ref, defineAsyncComponent } from 'vue';
const Form = defineAsyncComponent(() => import('@/components/product/Form.vue'))
const DeleteDialog = defineAsyncComponent(() => import('@/components/product/Delete.vue'))

const productsAPI: HttpAPI | undefined = inject('productsAPI')

const products = ref([])
const tableKey = ref(1)
const headers = computed(() => {
  return [
    { text: 'No', value: 'no' },
    { text: 'Name', value: 'name' },
    { text: 'Code', value: 'code' },
    { text: 'Slug', value: 'slug' },
    { text: 'Actions', value: 'action' },
  ]
})
const filterBy = ref<ProductFilter>({
  name: '',
  code: '',
  category_id: null
})

function mounted(): void {
  productsAPI?.get()
    .then(res => {
      products.value = res.data
    })
}

function onFilter(data: ProductFilter): void {
  filterBy.value = {...data}
  tableKey.value += 1
}

onMounted(() => {
  mounted()
})

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <div class="d-flex justify-space-between">
              Products
              <div>
                <Filter @filter="onFilter" />
                <Form @close="mounted()" />
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <DataTable :headers="headers" :items="products" :filterBy="filterBy" :key="tableKey">
              <template #no="{ currentIndex, currentPage }">
                {{ (currentIndex + 1) + ((currentPage - 1) * 10) }}
              </template>
              <template #action="{ item }">
                <div class="action">
                  <Form mode="edit" :id="item.id" icon="mdi-pencil" color-button="orange" @close="mounted()" />
                  <DeleteDialog :id="item.id" @close="mounted()"/>
                </div>
              </template>
            </DataTable>
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