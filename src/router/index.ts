import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product/:bookId(\\d+)',
      name: 'book details',
      component: () => import('../views/ProductDetails.vue'),
      sensitive: true,
    },
  ],
})

export default router
