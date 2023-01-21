<script setup lang="ts">
import type { HttpAPI } from '@/types/api';
import type { Category } from '@/types/category';
import type { ProductFilter } from '@/types/product';
import { onMounted, ref, inject} from 'vue';
const emits = defineEmits(['close', 'filter'])
const categoriesAPI: HttpAPI | undefined = inject('categoriesAPI')

const dialog = ref(false)
const categories = ref<Array<Category>>([])

const base: ProductFilter = {
  name: '',
  code: '',
  category_id: null
}
const filterBy = ref<ProductFilter>({...base})
  
function close() {
  emits('close')
  dialog.value = false
}

async function submit() {
  emits('filter', filterBy.value)
  close()
}


async function onBtnClick() {
}

async function reset() {
  filterBy.value = {...base}
  emits('filter', filterBy.value)
  close()
}

onMounted(() => {
  categoriesAPI?.get()
    .then(res => {
      categories.value = [...res.data]
    })
})

</script>

<template>
  <v-btn
    variant="text"
    @click="onBtnClick"
  >
    <v-icon icon="mdi-filter-variant" />
    <v-dialog v-model="dialog" activator="parent" max-width="500">
      <v-card>
        <v-card-title>
          Filter
        </v-card-title>
        <v-card-text>
          <v-form ref="formProduct">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="filterBy.name" label="Name"/>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="filterBy.code" label="Code"/>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete v-model="filterBy.category_id" label="Category" :items="categories" item-title="name" item-value="id" />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions
          class="footer-form"
        >
          <v-spacer />
          <v-btn color="primary" @click="submit">Search</v-btn>
          <v-btn color="orange" @click="reset">Reset</v-btn>
          <v-btn color="orange" @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<style scoped>
.card-actions > * {
  flex: 1 1 auto;
}
</style>
