import { Route, Routes as Switch } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { CreateClient } from './pages/createClient';
import { CreateOrder } from './pages/createOrder';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Dashboard />} />
      <Route path="/client/create" element={<CreateClient />} />
      <Route path="/order/create" element={<CreateOrder />} />
    </Switch>
  );
};

export default Routes;
