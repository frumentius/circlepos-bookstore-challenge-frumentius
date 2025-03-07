import { openDB, type IDBPDatabase } from 'idb'
import { isArray, isObject } from '@/utils/validators'
import { IDB_NAME, IDB_TABLES, IS_DEBUG } from '@/utils/config'

export class IdbService {
  private idb: IDBPDatabase

  private constructor(idb: IDBPDatabase) {
    this.idb = idb
  }

  static async create(): Promise<IdbService> {
    const idb_name = IDB_NAME
    const idb_tables = IDB_TABLES
    const idb = await openDB(idb_name, 1, {
      upgrade: (db) => {
        idb_tables.forEach((val: string) => {
          if (!db.objectStoreNames.contains(val)) {
            db.createObjectStore(val, {
              keyPath: 'id',
              autoIncrement: true,
            })
          }
        })
      },
    })
    return new IdbService(idb)
  }

  private isValidTable(tableName: string): boolean {
    return IDB_TABLES.includes(tableName)
  }

  async store<T>(tableName: string, data: T | T[]): Promise<void> {
    try {
      if (!this.isValidTable(tableName)) {
        throw new Error(`Table "${tableName}" does not exist.`)
      }

      const checkTypeObj = isObject(data)
      const checkTypeArr = isArray(data)

      if (checkTypeObj) {
        await this.idb.add(tableName, data)
      } else if (checkTypeArr) {
        const tx = this.idb.transaction(tableName, 'readwrite')
        ;(data as T[]).forEach((val) => {
          tx.store.add(val)
        })
        await tx.done
      }
    } catch (error) {
      if (IS_DEBUG) console.error('Error storing data:', error)
      throw error
    }
  }

  async getAll<T>(tableName: string, index?: string): Promise<T[]> {
    try {
      if (index) {
        return await this.idb.getAllFromIndex(tableName, index)
      } else {
        return await this.idb.getAll(tableName)
      }
    } catch (error) {
      if (IS_DEBUG) console.error('Error retrieving data from IndexedDB:', error)
      throw error
    }
  }

  async get<T>(tableName: string, key: IDBValidKey): Promise<T | undefined> {
    try {
      return await this.idb.get(tableName, key)
    } catch (error) {
      console.error(`Error retrieving data from table "${tableName}" with key "${key}":`, error)
      throw error
    }
  }

  async update<T>(tableName: string, newData: T): Promise<void> {
    try {
      await this.idb.put(tableName, newData)
    } catch (error) {
      console.error(`Error updating data in table "${tableName}":`, error)
      throw error
    }
  }

  async delete(tableName: string, key: IDBValidKey | IDBValidKey[]): Promise<void> {
    try {
      if (isArray(key)) {
        const tx = this.idb.transaction(tableName, 'readwrite')
        for (const keyValue of key) {
          tx.store.delete(keyValue)
        }
        await tx.done
      } else {
        await this.idb.delete(tableName, key)
      }
    } catch (error) {
      if (IS_DEBUG) console.error(`Error deleting data from table "${tableName}":`, error)
      throw error
    }
  }

  async clear(tableName: string): Promise<void> {
    try {
      await this.idb.clear(tableName)
    } catch (error) {
      if (IS_DEBUG) console.error(`Error clearing table "${tableName}":`, error)
      throw error
    }
  }
}
