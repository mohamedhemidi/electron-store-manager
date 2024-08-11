import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'node:path'

export function setupDatabase(): typeof Database {
  const userDataPath = app.getPath('documents')
  const dbPath = path.join(userDataPath, 'electron_store_db.db')

  const db = new Database(dbPath, { verbose: console.log })
  return db
}
