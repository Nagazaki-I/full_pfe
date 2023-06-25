import React from 'react'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './pages/Home'
import productsData from './api/productsAPI'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Checkout from './pages/Checkout'

import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, ScrollRestoration } from 'react-router-dom'


const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}

// console.log(document.cookie);


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} loader={productsData} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/checkout' element={<Checkout />} />
      </Route>
    )
  )

  return (
    <div className='font-bodyFont bg-gray-200'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
