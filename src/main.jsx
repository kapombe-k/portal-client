import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignInForm from './pages/login.jsx';
import SignupForm from './pages/signup.jsx';

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
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
