<script setup lang="ts">
import { inject, onMounted, ref, watch, computed, nextTick, watchEffect, reactive} from 'vue';
import type { HttpAPI } from "@/types/api"


type buttonProps = {
  variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain" | undefined,
  icon: string | undefined,
  size: string | undefined,
  color: string | undefined
}

type Product = {
  id?: number,
  name: string,
  slug?: string,
  category_id: number | null,

  id_description: string,
  en_description: string,
  features: string,

  dimension_width: number,
  dimension_length: number,
  dimension_height: number,
  
  seat_width: number,
  seat_length: number,
  seat_height: number,

  files: Array<File>,

  created_at?: Date,
  updated_at?: Date
}

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
const form = ref<Product>({
  name: '',
  category_id: null,
  id_description: '',
  en_description: '',
  features: '',
  dimension_height: 0,
  dimension_length: 0,
  seat_width: 0,
  seat_height: 0,
  seat_length: 0,
  dimension_width: 0,
  files: []
})

function close() {
  resetForm()
  emits('close')
  dialog.value = false
}

function resetForm() {
  // reset form
}

function validatingForm() {
  // validating form
}

async function submit() {
}

watch(form, validatingForm, { deep: true })
const buttonProps = computed((): buttonProps => {
  const buttonCreateProps: buttonProps = {
    variant: undefined,
    icon: undefined,
    size: undefined,
    color: 'primary'
  }
  const buttonEditProps: buttonProps = {
    variant: 'plain',
    icon: props.icon,
    size: 'x-small',
    color: props.colorButton
  }
  return props.mode === 'create' ? buttonCreateProps : buttonEditProps
})

async function onBtnClick() {
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

function isNumber (evt: KeyboardEvent): void {
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const keyPressed: string = evt.key;
  
  if (!keysAllowed.includes(keyPressed)) {
          evt.preventDefault()
  }
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
                    label="Product Name"
                  />
                </v-col>
                <v-col
                  md="6"
                >
                  <v-autocomplete
                    v-model="form.category_id"
                    label="Category"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12">
                  <v-textarea v-model="form.en_description" label="Description (English)" counter />
                </v-col>
                <v-col md="12">
                  <v-textarea v-model="form.id_description" label="Description (Bahasa)" counter />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12">
                  <v-textarea v-model="form.features" label="Features" counter />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12"><h3>Dimension</h3></v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.dimension_width" @keypress="isNumber" label="Width" />
                </v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.dimension_length"  @keypress="isNumber" label="Length" />
                </v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.dimension_height"  @keypress="isNumber" label="Height" />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12"><h3>Seat</h3></v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.seat_width"  @keypress="isNumber" label="Width" />
                </v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.seat_length"  @keypress="isNumber" label="Length" />
                </v-col>
                <v-col md="4">
                  <v-text-field v-model.number="form.seat_height"  @keypress="isNumber" label="Height" />
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
