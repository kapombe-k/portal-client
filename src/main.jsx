import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import SignInForm from './pages/login.jsx';
import SignupForm from './pages/signup.jsx';
import Checkout from './pages/checkout.jsx';
import Plans from './pages/bundles.jsx';
import BundlesPage from './pages/bundlespage.jsx';
import DashboardHome from './pages/dashboardHome.jsx';
import DashboardLayout from './pages/dashboardLayout.jsx';
import UsersPage from './pages/usersPage.jsx';
import SupportTicketsPage from './pages/ticketsPage.jsx';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/",
    element: <SignInForm />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/checkout",
    element: <Checkout />
  },
  {
    path: "/plans",
    element: <Plans />,
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "bundles",
        element: <BundlesPage />,
      },
      {
        path: "tickets",
        element: <SupportTicketsPage />,
      }
    ],
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
