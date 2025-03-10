export interface Book {
  id: number
  title: string
  author: string
  isbn: string
  price: number
  availableStock: number
}
export interface Books {
  books: Book[]
}
export interface BookPurchaseResponse {
  message: string
  book?: Book
}
