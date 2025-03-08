import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useCartStore } from '@/stores/cart'

const app = createApp(App)
app.use(createPinia())

const cartStore = useCartStore()
cartStore.hydrate().finally(() => {
  app.use(router)
  app.mount('#app')
})
