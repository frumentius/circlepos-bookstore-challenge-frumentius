import { bookService } from '@/services/bookService.ts'
import type { Book } from '@/models/books'
import { IS_DEBUG } from '@/utils/config.ts'

export async function getBookDetails(bookId: number): Promise<Book> {
  try {
    const response = await bookService.getBook(bookId)
    return response
  } catch (err) {
    const errorMessage = 'Failed to fetch Book Details ID: ' + bookId
    if (IS_DEBUG) console.error(errorMessage, err)
    throw new Error(err instanceof Error ? `${errorMessage}: ${err.message}` : errorMessage)
  }
}

async function filterBooksId(filterId: number[]): Promise<Book[]> {
  try {
    const response = await bookService.getAllBooks()
    const filteredResponse: Book[] = []
    for (let i = 0; i < filterId.length; i++) filteredResponse.push(response[filterId[i] - 1])
    return filteredResponse
  } catch (err) {
    const errorMessage = 'Failed to fetch Book list'
    if (IS_DEBUG) console.error(errorMessage, err)
    throw new Error(err instanceof Error ? `${errorMessage}: ${err.message}` : errorMessage)
  }
}

export async function getBestSeller(): Promise<Book[]> {
  try {
    const response = await filterBooksId([9, 20, 15, 8, 17, 6, 1, 3, 18, 2])
    return response
  } catch (err) {
    if (IS_DEBUG) console.error(err)
    throw new Error(err instanceof Error ? err.message : 'Failed to fetch best sellers')
  }
}

export async function getNewArrival(): Promise<Book[]> {
  try {
    const response = await filterBooksId([19, 20, 15, 17, 1, 9, 6, 2, 16, 8])
    return response
  } catch (err) {
    if (IS_DEBUG) console.error(err)
    throw new Error(err instanceof Error ? err.message : 'Failed to fetch new arrivals')
  }
}

export async function getRomance(): Promise<Book[]> {
  try {
    const response = await filterBooksId([4, 11, 18, 3, 1, 12])
    return response
  } catch (err) {
    if (IS_DEBUG) console.error(err)
    throw new Error(err instanceof Error ? err.message : 'Failed to fetch romance')
  }
}

export async function getSciFiFantasy(): Promise<Book[]> {
  try {
    const response = await filterBooksId([13, 10, 2, 8, 9, 17])
    return response
  } catch (err) {
    if (IS_DEBUG) console.error(err)
    throw new Error(err instanceof Error ? err.message : 'Failed to fetch sci-fi & fantasy')
  }
}

export async function getChart(): Promise<Book[]> {
  try {
    const response = await filterBooksId([7, 14, 5, 16, 12, 3, 2, 10, 11])
    return response
  } catch (err) {
    if (IS_DEBUG) console.error(err)
    throw new Error(err instanceof Error ? err.message : 'Failed to fetch others')
  }
}

export async function getRelated(): Promise<Book[]> {
  try {
    const response = await filterBooksId([1, 5, 10, 15, 20])
    return response
  } catch (err) {
    if (IS_DEBUG) console.error(err)
    throw new Error(err instanceof Error ? err.message : 'Failed to fetch related')
  }
}
