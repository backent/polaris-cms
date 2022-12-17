<script lang="ts" setup>
import type { HttpAPI } from '@/types/api';
import { ref, inject } from 'vue';

const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})
const emits = defineEmits(['close'])
const productsAPI: HttpAPI | undefined = inject('productsAPI')
const dialog = ref(false)

function remove() {
  return productsAPI?.delete(props.id)
    .then(() => {
      close()
    })
}

function close() {
  emits('close')
  dialog.value = false
}
</script>

<template>
  <v-btn variant="text" size="x-small" color="red">
    <v-icon icon="mdi-trash-can-outline" />
    <v-dialog v-model="dialog" activator="parent" max-width="400">
      <v-card>
        <v-card-title>
          Remove
        </v-card-title>
        <v-card-text>
          Are you sure want to remove this item ?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="remove">Remove</v-btn>
          <v-btn color="orange" @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>