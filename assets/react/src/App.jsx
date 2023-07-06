import React, { useState } from 'react'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './pages/Home'
import productsData from './api/productsAPI'
import userWishlist from './api/wishlistAPI'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Wishlist from './pages/Wishlist'
import ProductDetail from './pages/ProductDetail'
import SuccessPage from './pages/Success'



import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, ScrollRestoration } from 'react-router-dom'


const Layout = ({handleCategorySelection}) => {
  return (
    <div>
      <Header handleCategorySelection={handleCategorySelection}/>
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}

// console.log(document.cookie);


function App() {
  const [selectedCategory, setSelectedCategory] = useState('')
  console.log(selectedCategory);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Layout handleCategorySelection={handleCategorySelection}/>}>
          {/* <Route index element={<Home />} loader={productsData(selectedCategory)} /> */}
          <Route index element={<Home category={selectedCategory}/>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} loader={userWishlist} />
          <Route path='/product'>
            <Route path=':id' element={<ProductDetail />} />
          </Route>
          <Route path='/success' element={<SuccessPage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
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
