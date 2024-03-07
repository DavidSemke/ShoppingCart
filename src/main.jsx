import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './components/App.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import HomePage from './components/HomePage.jsx'
import CartPage from './components/CartPage.jsx'
import BuyPage from './components/BuyPage.jsx'
import CategoryPage from './components/CategoryPage.jsx'
import './styles/index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "cart",
        element: <CartPage />        
      },
      {
        path: 'buy',
        element: <BuyPage />
      },
      {
        path: "categories/:categoryId",
        element: <CategoryPage />
      }
      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
