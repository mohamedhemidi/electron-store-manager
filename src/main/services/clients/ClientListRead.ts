import channels from '@shared/constants/channels'
import { setupDatabase } from '../../config/DBconfig'

const ClientListRead = async (event): Promise<void> => {
  const db = setupDatabase()
  const query = `SELECT * FROM clients`
  const stmt = db.prepare(query)
  const clientsList = stmt.all()
  await event.reply(channels.ClientsListReceive, clientsList)
}

export default ClientListRead
