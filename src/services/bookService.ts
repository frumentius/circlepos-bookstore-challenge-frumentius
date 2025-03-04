import type { Book, BookPurchaseResponse } from '@/models/books.ts'
import { BACK_END_URL, IS_DEBUG } from '@/utils/config.ts'
import axios from 'axios'

interface IBookService {
  getBook(id: number): Promise<Book>
  getAllBooks(): Promise<Book[]>
  purchaseBook(id: number): Promise<BookPurchaseResponse>
}

export class BookService implements IBookService {
  private readonly API_URL = BACK_END_URL + '/books'

  async getBook(id: number): Promise<Book> {
    try {
      const response = await axios.get(this.API_URL + '/' + id)
      return response.data
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
  async purchaseBook(id: number): Promise<BookPurchaseResponse> {
    try {
      const response = await axios.post(this.API_URL + '/' + id + 'purchase')
      return response.data
    } catch (error) {
      if (IS_DEBUG) console.error('Error posting Book purchase:', error)
      throw new Error('Failed to post book purchase.')
    }
  }
}

export const bookService = new BookService()
