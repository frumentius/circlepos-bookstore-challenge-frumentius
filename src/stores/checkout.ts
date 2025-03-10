import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import type { CartItem } from '@/models/carts'

import { makeSerializable } from '@/utils/parsers'

export const useCheckoutStore = defineStore('checkout', () => {
  const items = ref<CartItem[]>([])
  const sessionId = ref<string>('')

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  function startCheckout(payload: CartItem[]) {
    items.value = makeSerializable<CartItem[]>(payload)
    sessionId.value = uuidv4()
  }

  function clearCheckout() {
    items.value = []
    sessionId.value = ''
  }

  return { items, sessionId, totalItems, totalPrice, startCheckout, clearCheckout }
})
