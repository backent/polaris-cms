<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import type { HttpAPI } from '@/types/api';
import { computed } from '@vue/reactivity';
import { inject, onMounted, ref, defineAsyncComponent } from 'vue';
const Form = defineAsyncComponent(() => import('@/components/category/Form.vue'))
const DeleteDialog = defineAsyncComponent(() => import('@/components/category/Delete.vue'))

const categoriesAPI: HttpAPI | undefined = inject('categoriesAPI')

const categories = ref([])
const headers = computed(() => {
  return [
    { text: 'No', value: 'no' },
    { text: 'Name', value: 'name' },
    { text: 'Slug', value: 'slug' },
    { text: 'Actions', value: 'action' },
  ]
})

function mounted(): void {
  categoriesAPI?.get()
    .then(res => {
      categories.value = res.data
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
              Categories
              <Form @close="mounted()" />
            </div>
          </v-card-title>
          <v-card-text>
            <DataTable :headers="headers" :items="categories">
              <template #no="{ currentIndex }">
                {{ currentIndex + 1 }}
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