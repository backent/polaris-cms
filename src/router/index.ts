import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const Category = () => import('@/views/Category.vue')
const Product = () => import('@/views/Product.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/categories',
      name: 'category',
      component: Category
    },
    {
      path: '/products',
      name: 'product',
      component: Product
    }
  ],
});

export default router;
