import React from 'react'

const FooterTop = () => {
  return (
    <div className='w-full bg-white py-6'>
        <div className='w-full border-t-[1px] border-b-[1px] py-8'>
            <div className='w-64 mx-auto text-center flex flex-col gap-1'>
                <p className='text-sm'>See personalized recommendations</p>
                <button className='w-full h-8 text-sm font-medium bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-600'>Sign in</button>
                <p className='text-sm mt-0'>New customer?  {/* Changed mt-1 to mt-0 */}
                  <span className='text-blue-600 ml-1 cursor-pointer'>Start here.</span> 
                </p>
            </div>
        </div>
    </div>
  )
}
 
export default FooterTop