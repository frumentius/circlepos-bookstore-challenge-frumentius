import { bookService } from '@/services/bookService.ts'
import type { Book } from '@/models/books'
import { IS_DEBUG } from '@/utils/config.ts'

export async function getBestSeller(): Promise<Book[] | string> {
  try {
    const response = await bookService.getAllBooks()
    //pick id for best seller
    return response
  } catch (err) {
    const errorMessage = 'Failed to fetch best sellers'
    if (IS_DEBUG) console.error(errorMessage, err)
    throw new Error(err instanceof Error ? `${errorMessage}: ${err.message}` : errorMessage)
  }
}
