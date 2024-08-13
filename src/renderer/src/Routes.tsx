import { Route, Routes as Switch } from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { CreateClient } from './pages/createClient'
import { ClientsList } from './pages/clientsList'
import { OrdersList } from './pages/ordersList'
import { CreateOrder } from './pages/createOrder'
import { EditClient } from './pages/editClient'
import { EditOrder } from './pages/editOrder'

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" element={<Dashboard />} />
      <Route path="/client/list" element={<ClientsList />} />
      <Route path="/client/create" element={<CreateClient />} />
      <Route path="/client/edit/:id" element={<EditClient />} />
      <Route path="/client/order/list" element={<OrdersList />} />
      <Route path="/order/list" element={<OrdersList />} />
      <Route path="/order/create" element={<CreateOrder />} />
      <Route path="/order/edit/:id" element={<EditOrder />} />
    </Switch>
  )
}

export default Routes
