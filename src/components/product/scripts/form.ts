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
export default {}