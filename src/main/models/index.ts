import ClientModel from './ClientModel'
import LicenseModel from './LicenseModel'
import OrderModel from './OrderModel'

export { default as ClientModel } from './ClientModel'
export { default as OrderModel } from './OrderModel'
export { default as LicenseModel } from './LicenseModel'

export const setupTables = (): void => {
  ClientModel.createTable()
  OrderModel.createTable()
  LicenseModel.createTable()
}
