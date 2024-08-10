import channels from '@shared/constants/channels'
import { setupDatabase } from '../../config/DBconfig'

const OrderListRead = async (event): Promise<void> => {
  const db = setupDatabase()
  const query = `SELECT * 
                FROM orders
                ORDER BY createdAt DESC
                `
  const stmt = db.prepare(query)
  const ordersList = stmt.all()
  await event.reply(channels.OrdersListReceive, ordersList)
}

export default OrderListRead
