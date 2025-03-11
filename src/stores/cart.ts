import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { Book } from '@/models/books'
import type { CartItem } from '@/models/carts'

import { IdbService } from '@/services/idbService'
import { makeSerializable } from '@/utils/parsers'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const lastUpdated = ref<Date | null>(null)

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  async function addItem(item: Book) {
    let newQty = 1
    let doPush = true
    for (let i = 0; i < items.value.length; i++)
      if (items.value[i].id === item.id) {
        newQty = items.value[i].quantity + 1
        if (newQty <= items.value[i].availableStock) removeItem(item.id)
        else doPush = false
        break
      }

    if (doPush) {
      items.value.push({ ...item, quantity: newQty })
      lastUpdated.value = new Date()

      const idb = await IdbService.create()
      idb.clear('carts').then(() => {
        idb.store('carts', makeSerializable(items.value))
      })
    }
  }
  async function removeItem(itemId: number) {
    items.value = items.value.filter((i) => i.id !== itemId)
    lastUpdated.value = new Date()

    const idb = await IdbService.create()
    idb.delete('carts', itemId)
  }
  async function clearCart() {
    const idb = await IdbService.create()
    idb.clear('carts').then(() => {
      items.value = []
      lastUpdated.value = null
    })
  }

  async function hydrate() {
    try {
      const idb = await IdbService.create()
      const cartRes = await idb.getAll<CartItem[]>('carts')
      items.value = makeSerializable<CartItem[]>(cartRes)
    } catch (err) {
      throw err
    }
  }

  return { items, lastUpdated, totalItems, totalPrice, addItem, removeItem, clearCart, hydrate }
})
