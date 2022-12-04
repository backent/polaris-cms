import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import vuetify from './plugins/vuetify'
import filters from './plugins/filters'

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(filters);

app.mount("#app");
