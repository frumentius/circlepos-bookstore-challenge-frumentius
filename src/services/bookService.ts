import type { Book, BookPurchaseResponse } from '@/models/books.ts'
import type { CartItem } from '@/models/carts'
import { BACK_END_URL, IS_DEBUG } from '@/utils/config.ts'
import axios from 'axios'

interface IBookService {
  getBook(id: number): Promise<Book>
  getAllBooks(): Promise<Book[]>
  purchaseBook(book: CartItem): Promise<BookPurchaseResponse>
}

export class BookService implements IBookService {
  private readonly API_URL = BACK_END_URL + '/books'

  async getBook(id: number): Promise<Book> {
    try {
      const response = await axios.get(this.API_URL + '/' + id)
      return response.data.book
    } catch (error) {
      if (IS_DEBUG) console.error('Error fetching Book data:', error)
      throw new Error('Failed to fetch book data.')
    }
  }
  async getAllBooks(): Promise<Book[]> {
    try {
      const response = await axios.get(this.API_URL)
      return response.data.books
    } catch (error) {
      if (IS_DEBUG) console.error('Error fetching All Books data:', error)
      throw new Error('Failed to fetch all books data.')
    }
  }
  async purchaseBook(book: CartItem): Promise<BookPurchaseResponse> {
    try {
      const response = await axios.post(
        this.API_URL + '/' + book.id + '/purchase',
        book,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response.data
    } catch (error) {
      if (IS_DEBUG) console.error('Error posting Book purchase:', error)
      throw new Error('Failed to post book purchase.')
    }
  }
}
