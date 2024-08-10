import { setupDatabase } from '../../config/DBconfig'
const ClientDelete = async (id: string): Promise<void> => {
  const db = setupDatabase()

  const query = `DELETE FROM clients WHERE id = ?`

  const stmt = await db.prepare(query)
  await stmt.run(id)
}

export default ClientDelete
