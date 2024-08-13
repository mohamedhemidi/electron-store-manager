import channels from '@shared/constants/channels'
import { setupDatabase } from '../../config/DBconfig'
import IDashboardReport from '@shared/types/DashboardReport'
const DashboardReportRead = async (event): Promise<void> => {
  const db = setupDatabase()

  const result: IDashboardReport = {
    numberOfClient: 0,
    numberOfOrders: 0,
    orderPerDay: {
      date: [],
      order_count: []
    }
  }

  const clientNumberQuery = `SELECT COUNT(*) as count FROM clients`
  const clientNumber = await db.prepare(clientNumberQuery).get()
  result.numberOfClient = clientNumber.count

  const ordersNumberQuery = `SELECT COUNT(*) as count FROM orders`
  const ordersNumber = await db.prepare(ordersNumberQuery).get()
  result.numberOfOrders = ordersNumber.count

  const ordersPerDayQuery = `WITH RECURSIVE dates(date) AS (
    SELECT date('now', '-29 days')
        UNION ALL
        SELECT date(date, '+1 day')
        FROM dates
        WHERE date < date('now')
    )
    SELECT 
        dates.date AS date,
        COUNT(orders.id) AS order_count
    FROM 
        dates
    LEFT JOIN 
        orders ON date(orders.createdAt) = dates.date
    GROUP BY 
        dates.date
    ORDER BY 
        dates.date;`
  const ordersPerDay = await db.prepare(ordersPerDayQuery).all()
  ordersPerDay.forEach((row) => {
    result.orderPerDay.date.push(row.date)
    result.orderPerDay.order_count.push(row.order_count)
  })

  await event.reply(channels.DashboardReportRespone, result)
}

export default DashboardReportRead
