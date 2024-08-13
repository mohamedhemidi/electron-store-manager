import channels from '@shared/constants/channels'
import { setupDatabase } from '../../config/DBconfig'
import IOrderResponse from '@shared/types/OrderResponse'
const ClientOrdersRead = async (event, data): Promise<void> => {
  const db = setupDatabase()
  const query = `SELECT * 
                  FROM orders
                  WHERE ClientId = ?
                  ORDER BY createdAt DESC
                  `
  const results: IOrderResponse = {
    total: 0,
    next: 0,
    previous: 0,
    pageCount: 0,
    data: []
  }
  const stmt = db.prepare(query)
  const ordersList = stmt.all(data.id)

  // Pagination:

  if (data && data.page && data.limit) {
    const page = data.page
    const limit = data.limit

    const startIndex = (page - 1) * limit
    const lastIndex = page * limit

    results.total = ordersList.length
    results.data = ordersList.slice(startIndex, lastIndex)
    results.pageCount = Math.ceil(ordersList.length / limit)
    if (lastIndex < ordersList.length) {
      results.next = page + 1
    }
    if (startIndex > 0) {
      results.previous = page - 1
    }
  } else {
    results.data = ordersList
  }

  await event.reply(channels.ClientOrdersListReceive, results)
}

export default ClientOrdersRead
