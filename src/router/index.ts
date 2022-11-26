import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const Category = () => import('@/views/Category.vue')
const Product = () => import('@/views/Product.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
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
