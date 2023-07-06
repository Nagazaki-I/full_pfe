import React, { createContext, useEffect, useState } from 'react'
import Banner from '../components/home/Banner'
import ProductFeed from '../components/home/ProductFeed'
import { useLoaderData } from "react-router-dom"
import axios from 'axios';


export const ProductsDataContext = createContext();

function Home({category}) {
  // Added this instead of using useLoaderData() within the Products.jsx component. (I deconstructured the object and gave `data` an alias)
  // const { data: productsData } = useLoaderData() 
  const [productsData, setProductsData] = useState([])
  // console.log(category);

  useEffect(()=>{
    const fetchProductsData = async (category) => {
      const data = await axios.get(`/api/products?category=${category}`).then(response => response.data)
      // console.log(data.data);
      setProductsData(data.data)
    }
    fetchProductsData(category)
  }, [category])

  console.log(productsData);

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