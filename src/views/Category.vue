<script setup lang="ts">
import Form from '@/components/category/Form.vue'
import DataTable from '@/components/DataTable.vue';
import type { HttpAPI } from '@/types/api';
import { computed } from '@vue/reactivity';
import { inject, onMounted, ref } from 'vue';
const categoriesAPI: HttpAPI | undefined = inject('categoriesAPI')

const categories = ref([])
const headers = computed(() => {
  return [
    { text: 'id', value: 'id' },
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
              <template #action="{ item }">
                <div class="action">
                  <Form mode="edit" :id="item.id" icon="mdi-pencil" color-button="orange" @close="mounted()" />
                  <v-btn variant="text" size="x-small" color="red">
                    <v-icon icon="mdi-trash-can-outline" />
                  </v-btn>
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