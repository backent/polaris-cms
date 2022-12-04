<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

type Product = {
  id?: number,
  name: string,
  category_id: number | null,
  created_at?: Date,
  updated_at?: Date
}
const dialog = ref(false)
const form = ref<Product>({
  name: '',
  category_id: null,
})
const rules = ref({
  name: [
    (v: string) => !!v || 'Name is required!'
  ],
  category: [
    (v: number) => (!!v && v > 0) || 'Category is required!'
  ]
})
const formProduct = ref<null | { validate: () => null }>(null)

function validatingForm() {
  formProduct.value?.validate()
}

watch(form, validatingForm, { deep: true })
</script>

<template>
  <v-btn color="primary">
    Add New
    <v-dialog v-model="dialog" activator="parent" max-width="800">
      <v-card>
        <v-card-title>
          Form
        </v-card-title>
        <v-card-text>
          <v-form ref="formProduct">
            <v-container>
              <v-row>
                <v-col
                  md="6"
                >
                  <v-text-field
                    v-model="form.name"
                    :rules="rules.name"
                    label="Category Name"
                  />
                </v-col>
                <v-col
                  md="6"
                >
                  <v-autocomplete
                    label="Type"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions
          class="footer-form"
        >
          <v-spacer />
          <v-btn color="primary" @click="dialog = false">Save</v-btn>
          <v-btn color="orange" @click="dialog = false">Close</v-btn>
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
