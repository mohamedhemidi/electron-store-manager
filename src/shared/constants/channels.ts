const channels = {
  CreateClientRequest: 'client:create:request',
  UpdateClientRequest: 'client:update:request',
  DeleteClientRequest: 'client:delete:request',
  ClientsListRequest: 'client:list:request',
  ClientsListReceive: 'client:list:response',

  ClientOrdersListRequest: 'client:order-list:request',
  ClientOrdersListReceive: 'client:order-list:response',

  CreateOrderRequest: 'order:create:request',
  UpdateOrderRequest: 'order:update:request',
  DeleteOrderRequest: 'order:delete:request',
  OrdersListRequest: 'order:list:request',
  OrdersListReceive: 'order:list:response',

  PrintTiquetPdf: 'print:tiquet:pdf',

  DashboardReportRequest: 'dashboard:report:request',
  DashboardReportRespone: 'dashboard:report:response',

  LicenseKeyRequest: 'license:key:request',
  LicenseKeyResponse: 'license:key:response',

  LicenseVerifyRequest: 'license:verify:request',
  LicenseVerifyResponse: 'license:verify:response'
}
export default channels
