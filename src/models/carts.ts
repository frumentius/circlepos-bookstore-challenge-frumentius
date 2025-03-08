import type { Book } from '@/models/books'

export interface CartItem extends Book {
  quantity: number
}
