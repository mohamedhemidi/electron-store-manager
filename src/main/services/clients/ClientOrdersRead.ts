import channels from '@shared/constants/channels'
import { setupDatabase } from '../../config/DBconfig'
const ClientOrdersRead = async (event, data): Promise<void> => {
  const db = setupDatabase()
  const query = `SELECT * 
                  FROM orders
                  WHERE ClientId = ?
                  ORDER BY createdAt DESC
                  `
  const stmt = db.prepare(query)
  const ordersList = stmt.all(data.id)
  await event.reply(channels.ClientOrdersListReceive, ordersList)
}

export default ClientOrdersRead
