import React from 'react'
import { useLoaderData } from 'react-router-dom'



const Wishlist = () => {
    const wishlist = useLoaderData() 

    console.log(wishlist);

  return (
    wishlist.wishList.map((item) => (
        
        <div> wish list 1 = {item.id}  </div>
    ))
  )
}

export default Wishlist