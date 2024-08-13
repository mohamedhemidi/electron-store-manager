export default interface IDashboardReport {
  numberOfClient: number
  numberOfOrders: number
  orderPerDay: {
    date: string[]
    order_count: number[]
  }
}
