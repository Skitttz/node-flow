
import * as fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

interface DatabaseRow {
  [key: string]: any
}

// Use the `#` syntax for private fields instead of the `private` modifier (feature ECMASCript 2022)
// Provides a more explicit and secure way of defining private fields in classes.

export class Database {
  #database: Record<string, DatabaseRow[]> = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table: string, search?: Record<string, string>): DatabaseRow[] {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key]?.toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  insert(table: string, data: DatabaseRow): DatabaseRow {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table: string, id: string, data: DatabaseRow): void {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()
    }
  }

  delete(table: string, id: string): void {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}
