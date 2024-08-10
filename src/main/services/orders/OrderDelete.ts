import { setupDatabase } from '../../config/DBconfig'
const OrderDelete = async (id: string): Promise<void> => {
  const db = setupDatabase()

  const query = `DELETE FROM orders WHERE id = ?`

  const stmt = await db.prepare(query)
  await stmt.run(id)
}

export default OrderDelete
