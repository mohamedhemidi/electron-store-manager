import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'node:path'
import fs from 'fs'
export function setupDatabase(): typeof Database {
  const userDataPath = app.getPath('documents')
  const projectFolderName = 'electron-store'
  const projectFolderPath = path.join(userDataPath, projectFolderName)

  if (!fs.existsSync(projectFolderPath)) {
    fs.mkdirSync(projectFolderPath, { recursive: true })
  }

  const dbPath = path.join(projectFolderPath, 'electron_store_db.db')
  const db = new Database(dbPath, { verbose: console.log })

  return db
}
