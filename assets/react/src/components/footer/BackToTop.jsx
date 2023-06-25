import React from 'react'

const BackToTop = () => {
  const scrollToTop = () => {
    // document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
  }


  return (
    <div onClick={scrollToTop} className='w-full bg-[#37475A] py-4 flex justify-center hover:bg-slate-600 cursor-pointer'>
      <p className='text-white text-sm font-medium'>
        Back to top
      </p> 
    </div>
  )
}

export default BackToTop