import type { Book } from '@/models/books'

export type CartItem = Book & { qty: number }
