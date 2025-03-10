import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        { path: '', component: () => import('@/views/HomeView.vue') },
        {
          path: 'product/:bookId(\\d+)',
          name: 'book-details',
          component: () => import('@/views/ProductDetails.vue'),
          sensitive: true,
        },
      ],
    },
    {
      path: '/checkout',
      component: () => import('@/layouts/CheckoutLayout.vue'),
      children: [
        { path: '', component: () => import('@/views/CheckoutView.vue') },
        {
          path: 'success',
          name: 'checkout-success',
          component: () => import('@/views/CheckoutSuccessView.vue'),
        },
      ],
    },
  ],
})

export default router
