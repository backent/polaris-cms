<script setup lang="ts">
import { ref } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

type baseRoute = {
  text: string,
  icon: string,
  to: RouteLocationRaw
}

const items = ref<baseRoute[]>([
  { text: 'Categories', icon: 'mdi-folder', to: { name: 'category' } },
  { text: 'Products', icon: 'mdi-folder', to: { name: 'product' } }
])
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list :lines="false" density="compact" nav>
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" active-color="primary" :to="item.to">
        <template v-slot:prepend>
          <v-icon :icon="item.icon" />
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>