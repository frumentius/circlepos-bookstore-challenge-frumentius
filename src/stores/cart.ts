import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { Book } from '@/models/books'
import type { CartItem } from '@/models/carts'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const lastUpdated = ref<Date | null>(null)

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0),
  )

  function addItem(item: Book) {
    let newQty = 1
    let doPush = true
    for (let i = 0; i < items.value.length; i++)
      if (items.value[i].id === item.id) {
        newQty = items.value[i].qty + 1
        if (newQty <= items.value[i].availableStock) removeItem(item.id)
        else doPush = false
        break
      }

    if (doPush) {
      items.value.push({ ...item, qty: newQty })
      lastUpdated.value = new Date()
    }
  }
  function removeItem(itemId: number) {
    items.value = items.value.filter((i) => i.id !== itemId)
    lastUpdated.value = new Date()
  }

  function $hydrate() {
    console.log('Cart Store is Hydrated')
  }

  return { items, lastUpdated, totalItems, totalPrice, addItem, removeItem, $hydrate }
  /*state: () => {
    const thisState: CartState = { items: [], lastUpdated: null }
    return thisState
  },
  actions: {
    addItem(item: Book) {
      this.items.push({ ...item, addedAt: new Date() })
      this.lastUpdated = new Date()
    },
    removeItem(itemId: number) {
      this.items = this.items.filter((i) => i.id !== itemId)
      this.lastUpdated = new Date()
    },
  },
  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price, 0),
  },
  hydrate(state: CartState, initialState: CartState) {
    const store = this as CartState

    if (state.items.length === 0 && initialState.items) {
      store.items = initialState.items
    }
  },*/
})
