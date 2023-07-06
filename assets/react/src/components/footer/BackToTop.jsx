import React from 'react'
import { useLocation } from 'react-router-dom';



const BackToTop = () => {
  const { pathname } = useLocation()

  const scrollToTop = () => {
    // document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
  }

  const paths = ["/success", "/cart", "/wishlist"]

  return (
    <>
      {
        !paths.includes(pathname) ? 
        <div onClick={scrollToTop} className='w-full bg-[#37475A] py-4 flex justify-center hover:bg-slate-600 cursor-pointer'>
          <p className='text-white text-sm font-medium'>
            Back to top
          </p> 
        </div>
        :
        null
      }
    </>
  )
}

export default BackToTop