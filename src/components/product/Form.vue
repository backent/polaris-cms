<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

type Product = {
  id?: number,
  name: string,
  files: Array<string | File>,
  category_id: number | null,
  created_at?: Date,
  updated_at?: Date
}
const dialog = ref(false)
const form = ref<Product>({
  name: '',
  category_id: null,
  files: []
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
const file = ref<null | { click: () => null }>(null)

function validatingForm() {
  formProduct.value?.validate()
}

function clickFile() {
  file.value?.click()
}

function onFileInput(v: any): void {
  form.value.files = [...form.value.files, ...v.target.files]
}

function deleteFile(indexFile: number) {
  try {
    form.value.files = form.value.files.filter(file => file !== form.value.files[indexFile])
  } catch (error) {
    console.log('Error while deleting file')
    throw error
  }
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
                    label="Product Name"
                  />
                </v-col>
                <v-col
                  md="6"
                >
                  <v-text-field
                    label="Group"
                  />
                </v-col>
                <v-col
                  md="6"
                >
                  <v-autocomplete
                    v-model="form.category_id"
                    :rules="rules.category"
                    label="Category"
                  />
                </v-col>
                <v-col
                  md="12"
                >
                  <label for="lang">Description</label>
                  <v-switch
                    id="lang"
                    label="Indonesia"
                    color="red"
                    value="red"
                    hide-details
                  />
                  <v-textarea
                    placeholder="Put your description here ..."
                    counter
                  >

                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  md="6"
                >
                  <h4>Dimensions</h4>
                  <v-row>
                    <v-col md="12">
                      <v-text-field
                        label="Width"
                      />
                    </v-col>
                    <v-col md="12">
                      <v-text-field
                        label="Length"
                      />
                    </v-col>
                    <v-col md="12">
                      <v-text-field
                        label="Height"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  md="6"
                >
                  <h4>Seat</h4>
                  <v-row>
                    <v-col md="12">
                      <v-text-field
                        label="Width"
                      />
                    </v-col>
                    <v-col md="12">
                      <v-text-field
                        label="Length"
                      />
                    </v-col>
                    <v-col md="12">
                      <v-text-field
                        label="Height"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3" style="height: 40px;">
                  <v-btn
                    @click="clickFile()"
                  >
                    Add Image
                  </v-btn>
                  <input ref="file" type="file" accept=".png,.jpg,.jpeg" multiple style="visibility: hidden;" @input="onFileInput"/>
                </v-col>
                <v-col md="12" class="files">
                  <div v-for="(file, i) in form.files" :index="i" class="chip-container">
                    <v-chip prepend-icon="mdi-file-image"> 
                      {{ $ellipsis(file.name, 20) }}
                      <v-icon icon="mdi-trash-can-outline" color="pink" style="margin-left: 5px;" @click="deleteFile(i)" />
                    </v-chip>
                    <div class="tooltip">{{ file.name }}</div>
                  </div>
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
.tooltip {
  visibility: hidden;
  position: absolute;
  top: -30px;
  left: 0;
  white-space: nowrap;
  background: rgba(0, 0,0, .7);
  border-radius: 8px;
  padding: 0 15px;
  color: white;
  /* transition: all .5s ease; */
}

.chip-container {
  margin: 5px;
}

.chip-container:hover .tooltip {
  visibility: visible;
}

.files {
  display: flex;
  flex-flow: row wrap;
}
</style>
