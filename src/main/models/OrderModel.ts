import { setupDatabase } from '../config/DBconfig'

class OrderModel {
  static db = setupDatabase()

  static createTable(): void {
    const query = `
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(255) NOT NULL PRIMARY KEY,
          weight VARCHAR(255),
          price VARCHAR(255),
          color VARCHAR(255),
          dueDate DATE,
          type VARCHAR(255),
          notes VARCHAR(255),
          client_name VARCHAR(255),
          createdAt DATE NOT NULL,
          updatedAt DATE NOT NULL,
          clientId VARCHAR(255),
          FOREIGN KEY (clientId) REFERENCES clients(id)
        )
      `
    // if (db) {
    //   db.prepare(query).run()
    // }
    this.db.prepare(query).run()
  }
}
export default OrderModel
