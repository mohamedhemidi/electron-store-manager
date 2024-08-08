import { setupDatabase } from '../config/DBconfig'

class ClientModel {
  private static db = setupDatabase()

  id!: string
  name!: string
  createdAt!: string
  updatedAt!: string

  /**
   *
   */
  constructor(id: string, name: string, createdAt: string, updatedAt: string) {
    this.id = id
    this.name = name
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static createTable(): void {
    const query = `
        CREATE TABLE IF NOT EXISTS clients (
            id VARCHAR(255) PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            createdAt DATETIME,
            updatedAt DATETIME
        )
      `
    this.db.prepare(query).run()
  }
}
export default ClientModel
