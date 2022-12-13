<script setup lang="ts">
import { inject, onMounted, ref, watch, computed, nextTick, watchEffect, reactive} from 'vue';
import type { HttpAPI } from "@/types/api"

const typesAPI: HttpAPI | undefined = inject('typesAPI')
const categoriesAPI: HttpAPI | undefined = inject('categoriesAPI')

type Category = {
  id?: number,
  name: string,
  type_id: number | null,
  created_at?: Date,
  updated_at?: Date
}

type TypeProduct = {
  id?: number | null,
  name: string,
  slug?: string,
  created_at?: Date,
  updated_at?: Date
}

type buttonProps = {
  variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain" | undefined,
  icon: string | undefined,
  size: string | undefined,
  color: string | undefined
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
const form = ref<Category>({
  name: '',
  type_id: null,
})
const selectedType = ref<TypeProduct | undefined>({
  id: 0,
  name: ''
})
const rules = ref({
  name: [
    (v: string) => !!v || 'Name is required!'
  ],
  category: [
    (v: number) => (!!v && v > 0) || 'Category is required!'
  ]
})
let types =  reactive<Array<TypeProduct>>([])
const formProduct = ref<null | { validate: () => boolean }>(null)

function close() {
  resetForm()
  emits('close')
  dialog.value = false
}

function resetForm() {
  form.value = {
    name: '',
    type_id: null
  }
}

function validatingForm() {
  formProduct.value?.validate()
}

async function submit() {
  if (!(formProduct.value?.validate() ?? false)) {
    return
  }
  let response: Promise<any> | undefined
  if (props.mode === 'create') {
    response = categoriesAPI?.post(form.value)
  } else {
    response = categoriesAPI?.put(form.value.id!, form.value)
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
  form.value.type_id = selectedType.value?.id ?? 0
})
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
  await nextTick()
  if (props.mode === 'edit') {
    categoriesAPI?.show(props.id)
      .then(res => {
        form.value = { ...res.data }
        selectedType.value = types.find(type => type.id === form.value.type_id)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

onMounted(() => {
  typesAPI?.get()
    .then(res => {
      types = res.data
    })
})

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
                    v-model="selectedType"
                    label="Type"
                    :items="types"
                    item-title="name"
                    return-object
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
</style>
