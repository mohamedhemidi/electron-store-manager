import { setupDatabase } from '../../config/DBconfig'
const ClientUpdate = async (data): Promise<void> => {
  const db = setupDatabase()
  const updatedClient = {
    name: data.name,
    updatedAt: new Date().toISOString()
  }
  const query = `UPDATE clients SET name = ?, updatedAt = ? WHERE id = ?`

  const stmt = await db.prepare(query)
  await stmt.run(updatedClient.name, updatedClient.updatedAt, data.id)
}

export default ClientUpdate
