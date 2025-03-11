import type { CartItem } from '@/models/carts'
import { IS_DEBUG } from '@/utils/config'
import { purchaseBook } from './useBook'
import { useCartStore } from '@/stores/cart'

export async function processCheckout(payload: CartItem[]) {
  try {
    //Only purchase the first item in the cart due to back-end API limitation. The API doesn't have the capability for bulk purchase.
    await purchaseBook(payload[0])
    const shoppingBag = useCartStore()
    shoppingBag.removeItem(payload[0].id)
  } catch (err) {
    const errorMessage = 'Failed to Checkout'
    if (IS_DEBUG) console.error(errorMessage, err)
    throw new Error(err instanceof Error ? `${errorMessage}: ${err.message}` : errorMessage)
  }
}
