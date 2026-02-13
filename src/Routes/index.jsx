import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '../components/Layout/AuthLayout';
import DashboardLayout from '../Components/Layout/DashboardLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../Pages/Dashboard'; // we'll build this next
import NotFound from '../Pages/NotFound';
import Destinations from '../Pages/Destinations';
import Rules from '../Pages/Rules';
import Payments from '../Pages/Payments';
import Ledger from '../Pages/Ledger';
import Transfers from '../Pages/Transfers';
import Stripe from '../Pages/Stripe';
import Subscription from '../Pages/Subscription';
import Account from '../Pages/Account';
import Settings from '../Pages/Settings';
import Reports from '../Pages/Reports';
// ... import other pages

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'orders', element: <div>Orders Page</div> },
      { path: 'customers', element: <div>Customers Page</div> },
      {path: 'destinations',element: <Destinations />},
      {path:"rules", element:<Rules/>},
      {path:"payments",element:<Payments/>},
      {path:"ledger",element:<Ledger/>},
      {
  path: 'transfers',
  element: <Transfers />,
},
{
  path: 'stripe',
  element: <Stripe />,
},
{
  path: 'subscription',
  element: <Subscription />,
},
{
  path: 'account',
  element: <Account />,
},
{
  path: 'settings',
  element: <Settings />,
},
{
  path: 'reports',
  element: <Reports />,
},
      {path:"*",element:<NotFound/>}
     
    ],
  },
]);

export default router;