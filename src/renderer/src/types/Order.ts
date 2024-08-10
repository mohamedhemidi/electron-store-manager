export default interface IOrder {
  id: string
  client_name: string
  clientId: string | null
  weight: number
  price: number
  color: string
  type: string
  dueDate: string
  notes: string
  createdAt: string
}
