import { setupDatabase } from '../../config/DBconfig'
const OrderUpdate = async (data): Promise<void> => {
  const db = setupDatabase()
  const updatedOrder = {
    weight: data.order.weight,
    price: data.order.price,
    color: data.order.color,
    dueDate: data.order.dueDate,
    type: data.order.type,
    notes: data.order.notes,
    client_name: data.order.client_name,
    clientId: data.order.clientId,
    updatedAt: new Date().toISOString()
  }
  const query = `UPDATE orders SET  weight = ?, price = ?, color = ?,dueDate = ?,type = ?,notes = ?,client_name = ?,clientId = ? ,updatedAt = ? WHERE id = ?`

  const stmt = await db.prepare(query)
  await stmt.run(
    updatedOrder.weight,
    updatedOrder.price,
    updatedOrder.color,
    updatedOrder.dueDate,
    updatedOrder.type,
    updatedOrder.notes,
    updatedOrder.client_name,
    updatedOrder.clientId,
    updatedOrder.updatedAt,
    data.orderId
  )
}

export default OrderUpdate
