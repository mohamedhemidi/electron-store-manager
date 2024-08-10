import { setupDatabase } from '../../config/DBconfig'
import { v4 as uuidv4 } from 'uuid'
const OrderCreate = async (data): Promise<void> => {
  const db = setupDatabase()
  const newOrder = {
    id: uuidv4(),
    weight: data.weight,
    price: data.price,
    color: data.color,
    dueDate: data.dueDate,
    type: data.type,
    notes: data.notes,
    client_name: data.client_name,
    clientId: data.clientId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  const query = `INSERT INTO orders (id, weight, price, color,dueDate,type,notes,client_name,clientId,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)`

  const stmt = await db.prepare(query)
  await stmt.run(
    newOrder.id,
    newOrder.weight,
    newOrder.price,
    newOrder.color,
    newOrder.dueDate,
    newOrder.type,
    newOrder.notes,
    newOrder.client_name,
    newOrder.clientId,
    newOrder.createdAt,
    newOrder.updatedAt
  )
}

export default OrderCreate
