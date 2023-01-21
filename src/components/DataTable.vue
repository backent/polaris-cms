<script lang="ts" setup>
import { ref, computed } from 'vue'

type Header = {
  text: string,
  field: string
}

const page = ref(1)
const perPage = 10
const visiblePagination = ref(4)

const props = defineProps({
  headers: {
    type: Array,
    default: (): Array<Header> => ([])
  },
  items: {
    type: Array,
    default: () => ([])
  },
  filterBy: {
    type: Object,
    default: () => ({})
  }
})

const computedItems = computed(() => {
  let items = [...props.items]
  Object.entries(props.filterBy).forEach(([field, value]: Array<any>) => {
    if (!!value) {
      items = items.filter((item: any) => {
        if (typeof item[field] === 'number') {
          return item[field] === parseInt(value, 10)
        } else {
          return String(item[field]).includes(value)
        }
      })
    }
  })
  const start = perPage * page.value - perPage
  const end = perPage * page.value
  return items.slice(start, end)
})

const paginationLength = computed(() => {
  return Math.ceil(props.items.length / perPage)
})

</script>

<template>
  <div class="table-container">
    <v-table>
      <thead>
        <tr>
          <td v-for="(header, iHeader) in (headers as Array<any>)" :key="iHeader">
            {{ header.text }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, iItem) in (computedItems as Array<any>)" :key="iItem">
          <td v-for="(header, iHeader) in (headers as Array<any>)" :key="iHeader">
            <slot :name="header.value" :value="item[header.value]" :item="item"> {{ item[header.value] }} </slot>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      class="pagination"
      v-model="page"
      :length="paginationLength"
      :total-visible="visiblePagination"
    />
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .pagination {
    align-self: flex-end;
  }

  tbody > tr:hover {
    background-color: lighten(rgb(98, 0, 238), 50%);
  }
}

</style>