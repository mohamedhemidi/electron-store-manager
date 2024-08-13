import channels from '@shared/constants/channels'
import { setupDatabase } from '../../config/DBconfig'
import IClientResponse, { IClient } from '@shared/types/ClientsResponse'

const ClientListRead = async (event, data): Promise<void> => {
  const db = setupDatabase()

  let query = `SELECT * FROM clients`

  const results: IClientResponse = {
    total: 0,
    next: 0,
    previous: 0,
    pageCount: 0,
    data: []
  }

  if (data && data.searchValue) {
    query += ` WHERE name LIKE '%${data.searchValue}%'`
  }

  const stmt = db.prepare(query)
  const clientsList: IClient[] = stmt.all()

  // Pagination:
  if (data && data.page && data.limit) {
    const page = data.page
    const limit = data.limit

    const startIndex = (page - 1) * limit
    const lastIndex = page * limit

    results.total = clientsList.length
    results.data = clientsList.slice(startIndex, lastIndex)
    results.pageCount = Math.ceil(clientsList.length / limit)
    if (lastIndex < clientsList.length) {
      results.next = page + 1
    }
    if (startIndex > 0) {
      results.previous = page - 1
    }
  } else {
    results.data = clientsList
  }

  await event.reply(channels.ClientsListReceive, results)
}

export default ClientListRead
