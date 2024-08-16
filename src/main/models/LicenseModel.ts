import { setupDatabase } from '../config/DBconfig'

class LicenseModel {
  private static db = setupDatabase()

  static createTable(): void {
    const query = `
        CREATE TABLE IF NOT EXISTS licenses (
            id VARCHAR(255) PRIMARY KEY NOT NULL,
            license_key VARCHAR(255) NOT NULL,
            createdAt DATETIME,
            updatedAt DATETIME
        )
      `
    this.db.prepare(query).run()
  }
}

export default LicenseModel
