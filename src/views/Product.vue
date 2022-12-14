<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import type { HttpAPI } from '@/types/api';
import { computed } from '@vue/reactivity';
import { inject, onMounted, ref, defineAsyncComponent } from 'vue';
const Form = defineAsyncComponent(() => import('@/components/product/Form.vue'))

const productsAPI: HttpAPI | undefined = inject('productsAPI')

const products = ref([])
const headers = computed(() => {
  return [
    { text: 'No', value: 'no' },
    { text: 'Name', value: 'name' },
    { text: 'Slug', value: 'slug' },
    { text: 'Actions', value: 'action' },
  ]
})

function mounted(): void {
  productsAPI?.get()
    .then(res => {
      products.value = res.data
    })
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
              <Form @close="mounted()" />
            </div>
          </v-card-title>
          <v-card-text>
            <DataTable :headers="headers" :items="products">
              <template #no="{ item }">
                {{ products.findIndex((product: any) => product.id === item.id)! + 1 }}
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