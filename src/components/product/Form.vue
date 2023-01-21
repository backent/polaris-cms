<script setup lang="ts">
import { inject, onMounted, ref, watch, computed, nextTick, watchEffect, reactive} from 'vue';
import type { HttpAPI } from "@/types/api"
import type { FormProduct } from '@/types/product';
import type { Category } from '@/types/category';
import type { ButtonProps } from '@/types/others';

const categoriesAPI: HttpAPI | undefined = inject('categoriesAPI')
const productsAPI: HttpAPI | undefined = inject('productsAPI')
const tempMediaAPI: HttpAPI | undefined = inject('tempMediaAPI')

const emits = defineEmits(['close'])
const props = defineProps({
  mode: {
    type: String,
    default: 'create'
  },
  icon: {
    type: String,
    default: 'mdi-pencil'
  },
  colorButton: {
    type: String,
    default: 'orange'
  },
  id: {
    type: Number,
    default: 0
  }
})

const dialog = ref(false)
const file = ref<null | { click: () => null }>(null)
const formProduct = ref<null | { validate: () => { valid: boolean } }>(null)
const selectedCategory = ref<Category>()
let categories: Array<Category> = []
const rules = ref({
  name: [
    (v: string) => !!v || 'Name is required!'
  ],
  category_id: [
    (v: number) => !!v || 'Category is required!'
  ],
  code: [],
  id_description: [],
  en_description: [],
  features: [],
  premium_material: [],
  dimension_height: [
    // (v: number) => !!v || 'Dimension height is required'
  ],
  dimension_length: [
    // (v: number) => !!v || 'Dimension length is required'
  ],
  dimension_width: [
    // (v: number) => !!v || 'Dimension width is required'
  ],
  seat_width: [
    // (v: number) => !!v || 'Seat width is required'
  ],
  seat_height: [
    // (v: number) => !!v || 'Seat height is required'
  ],
  seat_length: [
    // (v: number) => !!v || 'Seat length is required'
  ]
})
const base = {
  name: '',
  category_id: null,
  id_description: '',
  en_description: '',
  features: '',
  premium_material: '',
  dimension_height: 0,
  dimension_length: 0,
  seat_width: 0,
  seat_height: 0,
  seat_length: 0,
  dimension_width: 0,
  code: '',
  files: [],
  removedFiles: []
}
const form = ref<FormProduct>({ ...base })
const selectedFiles = ref<Array<any>>([])

function close() {
  emits('close')
  dialog.value = false
}

async function validatingForm() {
  // validating form
  return formProduct.value?.validate()
}

async function submit() {
  const isValidate = await validatingForm()
  if (!isValidate?.valid ?? false) {
    return
  }
  let response: Promise<any> | undefined
  const payload = {
    ...form.value,
    files: form.value.files.map(file => file.id)
  }
  if (props.mode === 'create') {
    response = productsAPI?.post(payload)
  } else {
    response = productsAPI?.put(form.value.id!, payload)
  }
  return response?.then(() => {
      close()
    })
    .catch(err => {
      throw err
    })
  
}

watch(form, validatingForm, { deep: true })
watchEffect(() => {
  form.value.category_id = selectedCategory.value?.id ?? 0
})
const buttonProps = computed((): ButtonProps => {
  const buttonCreateProps: ButtonProps = {
    variant: undefined,
    icon: undefined,
    size: undefined,
    color: 'primary'
  }
  const buttonEditProps: ButtonProps = {
    variant: 'plain',
    icon: props.icon,
    size: 'x-small',
    color: props.colorButton
  }
  return props.mode === 'create' ? buttonCreateProps : buttonEditProps
})

onMounted(() => {
  categoriesAPI?.get()
    .then(res => {
      categories = res.data
    })
})

function initForm() {
  form.value = {
    name: '',
    category_id: null,
    id_description: '',
    en_description: '',
    features: '',
    premium_material: '',
    dimension_height: 0,
    dimension_length: 0,
    seat_width: 0,
    seat_height: 0,
    seat_length: 0,
    dimension_width: 0,
    code: '',
    files: [],
    removedFiles: []
  }
  selectedFiles.value = []
}

async function onBtnClick() {
  initForm()
  if (props.mode !== 'create') {
    productsAPI?.show(props.id)
    .then(res => {
      const { images, ...data} = res.data
      form.value = { ...base, ...data }
      selectedCategory.value = categories.find(category => category.id === form.value.category_id)
      setImages(images)
    })
  }
}

function clickFile() {
  file.value?.click()
}

async function onFileInput(v: any): Promise<void> {
  const files = v.target.files
  const requests = []
  for (let index = 0; index < files.length; index++) {
    const file = files.item(index)
    const fd = new FormData()
    fd.append('file', file)
    requests.push(tempMediaAPI?.post(fd))
  }
  await Promise.all(requests)
    .then(responses => {
      form.value.files = [...form.value.files, ...responses.reduce((pre, curr, currIndex) => {
        pre.push({
          id: curr.data,
          file: files.item(currIndex)
        })
        return pre
      }, [])]
    })
  selectedFiles.value = [...selectedFiles.value, ...v.target.files]
}

function deleteFile(file: any) {
  try {
    if (file.id) {
      form.value.removedFiles = [...form.value.removedFiles, file.id]
      selectedFiles.value = selectedFiles.value.filter(selectedFile => (selectedFile?.id ?? 0) !== file.id)
    } else {
      selectedFiles.value = selectedFiles.value.filter(selectedFile => selectedFile !== file)
      form.value.files = form.value.files.filter(formFile => formFile.file !== file)
    }
  } catch (error) {
    console.log('Error while deleting file')
    throw error
  }
}

function isNumber (evt: KeyboardEvent): void {
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const keyPressed: string = evt.key;
  
  if (!keysAllowed.includes(keyPressed)) {
          evt.preventDefault()
  }
}

function setImages(images: Array<any>) {
  selectedFiles.value = images.map(image => ({ ...image, name: image.original_name }))
}
</script>

<template>
  <v-btn
    :variant="buttonProps.variant"
    :size="buttonProps.size"
    :color="buttonProps.color"
    @click="onBtnClick"
  >
    {{ mode === 'create' ? 'Add New' : '' }} <v-icon v-if="mode !== 'create'" :icon="buttonProps.icon" />
    <v-dialog v-model="dialog" activator="parent" max-width="800">
      <v-card>
        <v-card-title>
          Form
        </v-card-title>
        <v-card-text>
          <v-form ref="formProduct">
            <v-container>
              <v-row>
                <v-col md="12"><h3>Details</h3></v-col>
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
                  <v-autocomplete
                    v-model="selectedCategory"
                    :rules="rules.category_id"
                    :items="categories"
                    label="Category"
                    item-title="name"
                    return-object
                  />
                </v-col>
                <v-col
                  md="6"
                >
                  <v-text-field
                    v-model="form.code"
                    :rules="rules.code"
                    label="Code"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12">
                  <v-textarea v-model="form.en_description" :rules="rules.en_description" label="Description (English)" counter />
                </v-col>
                <v-col md="12">
                  <v-textarea v-model="form.id_description" :rules="rules.id_description" label="Description (Bahasa)" counter />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12">
                  <v-textarea v-model="form.features" :rules="rules.features" label="Features" counter />
                </v-col>
                <v-col md="12">
                  <v-textarea v-model="form.premium_material" :rules="rules.premium_material" label="Premium Material" counter />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12"><h3>Dimension</h3></v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.dimension_width" :rules="rules.dimension_width" @keypress="isNumber" label="Width" />
                </v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.dimension_length" :rules="rules.dimension_length" @keypress="isNumber" label="Length" />
                </v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.dimension_height" :rules="rules.dimension_height" @keypress="isNumber" label="Height" />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12"><h3>Seat</h3></v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.seat_width" :rules="rules.seat_width" @keypress="isNumber" label="Width" />
                </v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.seat_length" :rules="rules.seat_length" @keypress="isNumber" label="Length" />
                </v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.seat_height" :rules="rules.seat_height" @keypress="isNumber" label="Height" />
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
                  <div v-for="(file, i) in selectedFiles" :index="i" class="chip-container">
                    <v-chip prepend-icon="mdi-file-image"> 
                      {{ $ellipsis(file.name, 20) }}
                      <v-icon icon="mdi-trash-can-outline" color="pink" style="margin-left: 5px;" @click="deleteFile(file)" />
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
          <v-btn color="primary" @click="submit">Save</v-btn>
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
