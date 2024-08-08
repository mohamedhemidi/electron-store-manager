import ClientModel from './ClientModel'
import OrderModel from './OrderModel'

export { default as ClientModel } from './ClientModel'
export { default as OrderModel } from './OrderModel'

export const setupTables = (): void => {
  ClientModel.createTable()
  OrderModel.createTable()
}
