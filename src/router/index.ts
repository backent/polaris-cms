import { useAppStore } from "@/stores/app";
import { createRouter, createWebHistory } from "vue-router";

declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    fullScreen?: boolean
  }
}

import HomeView from "../views/HomeView.vue";

const Category = () => import('@/views/Category.vue')
const Product = () => import('@/views/Product.vue')
const Login = () => import('@/views/Login.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        fullScreen: true
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  const isFullScreenMode: boolean = to?.meta?.fullScreen ?? false
  const appStore = useAppStore()
  appStore.setFullScreen(isFullScreenMode)
  
  next()
})

export default router;
