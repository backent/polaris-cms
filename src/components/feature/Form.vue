<script setup lang="ts">
import { ref, inject, watch, computed } from 'vue';
import type { FormFeature } from '@/types/feature';
import type { HttpAPI } from '@/types/api';
import type { ButtonProps } from '@/types/others';

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

const emits = defineEmits(['close'])

const tempMediaAPI: HttpAPI | undefined = inject('tempMediaAPI')
const featuresAPI: HttpAPI | undefined = inject('featuresAPI')

const dialog = ref(false)
const loadingSubmit = ref(false)
const base: FormFeature = {
  name: '',
  order: 99,
  temp_id: 0
}
const form = ref<FormFeature>(base)
const file = ref<null | { click: () => null }>(null)
const formFeature = ref<null | { validate: () => { valid: boolean } }>(null)
const selectedFile = ref()

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

const imgUrl = computed(() => {
  if (selectedFile.value) {
    return printUrl(selectedFile.value)
  } else if (form.value.link) {
    return form.value.link
  } else {
    return ''
  }
})

function close() {
  // closing
  emits('close')
  dialog.value = false
}
async function submit() {
  const isValidate = await validatingForm()
  if (!isValidate?.valid ?? false) {
    return
  }
  let response: Promise<any> | undefined
  const payload = {
    ...form.value
  }
  delete payload.link
  delete payload.created_at
  delete payload.updated_at
  
  loadingSubmit.value = true
  if (props.mode === 'create') {
    response = featuresAPI?.post(payload)
  } else {
    response = featuresAPI?.put(form.value.id!, payload)
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

async function validatingForm() {
  // validating form
  return formFeature.value?.validate()
}
watch(form, validatingForm, { deep: true })

function onBtnClick() {
  // onbtnClick
  form.value = { ...base }
  if (props.mode !== 'create') {
    featuresAPI?.show(props.id)
      .then(res => {
        form.value = { ...res.data }
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
    .then(([res]) => {
      form.value.temp_id = res.data
      selectedFile.value = files[0]
    })
}

function printUrl(file: any) {
  if (!!file) {
    return URL.createObjectURL(file)
  }
  return ''
}

</script>

<template>
  <v-btn
    :variant="buttonProps.variant"
    :size="buttonProps.size"
    :color="buttonProps.color"
    @click="onBtnClick"
  >
    {{ mode === 'create' ? 'Add' : '' }} <v-icon v-if="mode !== 'create'" :icon="buttonProps.icon" />
    <v-dialog v-model="dialog" activator="parent" max-width="600">
      <v-card>
        <v-card-title>
          Form
        </v-card-title>
        <v-card-text>
          <v-form ref="formFeature">
            <v-container>
              <v-row>
                <v-col md="12">
                  <v-text-field
                    v-model="form.name"
                    label="Name"
                  />
                </v-col>
              </v-row>
              <v-row v-show="imgUrl" class="d-flex justify-center">
                <v-col md="10" class="d-flex justify-center">
                  <img class="img-display" :src="imgUrl" alt="" />
                </v-col>
              </v-row>
              <v-row class="d-flex justify-center">
                <v-col md="10" class="d-flex justify-center">
                  <v-btn
                    @click="clickFile()"
                  >
                    {{ !imgUrl ? 'Add Image' : 'Update Image' }}
                  </v-btn>
                  <input ref="file" type="file" accept=".png,.jpg,.jpeg" style="position: absolute; visibility: hidden;" @input="onFileInput"/>
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


<style lang="scss">
.img-display {
  width: 200px;
  height: auto;
}
</style>