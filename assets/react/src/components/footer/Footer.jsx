import React from 'react'
import BackToTop from './BackToTop'
import FooterMiddle from './FooterMiddle'
import FooterTop from './FooterTop'


const Footer = () => {
  return (
    <div className='font-titleFont'>
        <FooterTop />
        <BackToTop />
        <FooterMiddle />
    </div>
  )
}

export default Footer