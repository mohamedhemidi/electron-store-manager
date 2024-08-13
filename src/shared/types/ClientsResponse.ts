export default interface IClientResponse {
  total: number
  next: number
  previous: number
  pageCount: number
  data: IClient[]
}

export interface IClient {
  id: string
  name: string
  createdAt: string
}
