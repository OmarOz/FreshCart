import { useState } from 'react'
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import { useQueryClient, QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import About from './components/About/About';
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'categories/:category', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ]
  }
])
function App() {
  const [count, setCount] = useState(0)

  const queryClient = new QueryClient()

  return <CartContextProvider>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster/>
          <ReactQueryDevtools />
        </CounterContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </CartContextProvider>
}

export default App
