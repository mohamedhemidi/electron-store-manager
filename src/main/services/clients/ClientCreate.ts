import { setupDatabase } from '../../config/DBconfig'
import { v4 as uuidv4 } from 'uuid'
const ClientCreate = async (name: string): Promise<void> => {
  const db = setupDatabase()
  const newClient = {
    id: uuidv4(),
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  const query = `INSERT INTO clients (id, name, createdAt, updatedAt) VALUES (?, ?, ?, ?)`

  const stmt = await db.prepare(query)
  await stmt.run(newClient.id, newClient.name, newClient.createdAt, newClient.updatedAt)
}

export default ClientCreate
