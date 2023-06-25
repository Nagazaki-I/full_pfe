import React, { createContext } from 'react'
import Banner from '../components/home/Banner'
import ProductFeed from '../components/home/ProductFeed'
import { useLoaderData } from "react-router-dom"


export const ProductsDataContext = createContext();

function Home() {
  // Added this instead of using useLoaderData() within the Products.jsx component. (I deconstructured the object and gave an alias to the data element)
  const { data: productsData } = useLoaderData() 


  return (
    <div>
      <Banner />
      <ProductsDataContext.Provider value={productsData}>
        <ProductFeed />
      </ProductsDataContext.Provider>

    </div>
  )
}

export default Home