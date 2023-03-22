<script setup lang="ts">
import { inject, onMounted, ref, watch, computed, nextTick, watchEffect, reactive} from 'vue';
import type { HttpAPI } from "@/types/api"
import type { FormProduct } from '@/types/product';
import type { Category } from '@/types/category';
import type { ButtonProps } from '@/types/others';
import { VueDraggableNext } from 'vue-draggable-next';
import type { Features } from '@/types/feature';
 
const categoriesAPI: HttpAPI | undefined = inject('categoriesAPI')
const productsAPI: HttpAPI | undefined = inject('productsAPI')
const tempMediaAPI: HttpAPI | undefined = inject('tempMediaAPI')
const featuresAPI: HttpAPI | undefined = inject('featuresAPI')

const apiHost = import.meta.env.VITE_API_URL ?? 'http://localhost:7008'
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
const loadingSubmit = ref(false)
const file = ref<null | { click: () => null }>(null)
const formProduct = ref<null | { validate: () => { valid: boolean } }>(null)
const selectedCategory = ref<Category>()
let categories: Array<Category> = []
let features: Features = []

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
  removedFiles: [],
  order: [],
  feature_ids: []
}
const form = ref<FormProduct>({ ...base })
const selectedFiles = ref<Array<any>>([])
const selectedFeatures = ref<Features>([])

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
    files: form.value.files.map(file => file.id),
    order: generateOrderRequest()
  }
  loadingSubmit.value = true
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
    .finally(() => {
      loadingSubmit.value = false
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
  featuresAPI?.get()
    .then(res => {
      features = res.data
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
    removedFiles: [],
    order: [],
    feature_ids: []
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
    .then(() => {
      selectedFiles.value = [...selectedFiles.value, ...v.target.files]
    })
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

function generateOrderRequest(): Array<any> {
  const result = selectedFiles.value.reduce((pre, curr, currIndex) => {
    const newImage = !curr.id
    const order = currIndex + 1
    if (newImage) {
      pre.push({
        newImage: true,
        order,
        id: form.value.files.find(file => file.file === curr)!.id
      })
    } else {
      pre.push({
        newImage: false,
        order,
        id: curr.id
      })
    }
    return pre
  }, [])
  
  return result
}

function printUrl(file: any) {
  return URL.createObjectURL(file)
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
              <v-row class="d-flex justify-center">
                <v-col md="12"><h3>Features</h3></v-col>
                <v-col :md="Math.floor(12 / features.length)" v-for="data in features" :key="data.id">
                  <div class="feature-container">
                    <label :for="`feature-${data.id}`"><img :src="`${apiHost}${data.link}`" /></label>
                    <v-checkbox :id="`feature-${data.id}`" v-model="form.feature_ids" :value="data.id" class="checkbox" />
                    <div class="feature-name"> {{ data.name }} </div>
                  </div>
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
                  <VueDraggableNext :list="selectedFiles">
                    <div v-for="(file, i) in selectedFiles" :index="i" class="chip-container">
                      <v-chip prepend-icon="mdi-file-image"> 
                        {{ $ellipsis(file.name, 20) }}
                        <v-icon icon="mdi-trash-can-outline" color="pink" style="margin-left: 5px;" @click="deleteFile(file)" />
                      </v-chip>
                      <div class="tooltip">
                        <img v-if="file.link" :src="`${apiHost}${file.link}`" />
                        <img v-else :src="printUrl(file)" />
                      </div>
                    </div>
                  </VueDraggableNext>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions
          class="footer-form"
        >
          <v-spacer />
          <v-btn v-if="!loadingSubmit" color="primary" @click="submit">Save</v-btn>
          <div v-else class="lds-facebook"><div></div><div></div><div></div></div>
          <v-btn color="orange" @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<style lang="scss" scoped>

.feature-container {
  position: relative;
  label {
    cursor: pointer;
  }
  img {
    width: 100%;
    height: auto;
  }
  & > .checkbox {
    position: absolute;
    top: -20px;
    right: 0;
  }
  .feature-name {
    position: absolute;
    top: 90px;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    font-size: 16px;
    font-weight: 700;
    opacity: 0.6;
    transition: all 0.3s;
  }
  &:hover .feature-name {
    opacity: 1;
  }
}
.card-actions > * {
  flex: 1 1 auto;
}
.tooltip {
  visibility: hidden;
  position: absolute;
  top: -210px;
  white-space: nowrap;
  background: rgba(0, 0, 0, .2);
  border-radius: 8px;
  padding: 0 15px;
  color: white;
  /* transition: all .5s ease; */
}

.tooltip img {
  height: 200px;
  width: 200px;
  object-fit: contain;
}

.chip-container {
  margin: 5px;
}

*:hover:not(:active) + .tooltip {
  visibility: visible;
}

.files {
  display: flex;
  flex-flow: row wrap;
}
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: scale(35%);
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #a371eb;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}


</style>
