export default interface IOrderResponse {
  total: number
  next: number
  previous: number
  pageCount: number
  data: IOrder[]
}

export interface IOrder {
  id: string
  client_name: string
  weight: number
  price: number
  notes: string
  color: string
  dueDate: string
  type: string
  createdAt: string
  updatedAt: string
}
