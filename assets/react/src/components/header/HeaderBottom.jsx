import React, { useState, useRef, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SideNavContent from './SideNavContent'
import {motion} from "framer-motion"




const HeaderBottom = () => {
    const [sideBar, setSideBar] = useState(false)
    const ref = useRef()

    useEffect(() => {
        document.body.addEventListener("click", (e) => {
                if (e.target.contains(ref.current)) {
                    setSideBar(false)
                }
            }
        )
    }, [])

    return (
        <div className='w-full px-4 h-[36px] bg-amazon_light text-white flex items-center '>
            {/* ===================== ItemsList starts here ========================== */}
            <ul className='flex items-center gap-1 text-sm tracking-wide'>
                <li onClick={() => setSideBar(true)} className="headerHover flex items-center gap-1"><MenuIcon />All</li> {/*I don't know if the 'flex items-center' here have any effect*/}
                <li className="headerHover hidden md:inline-flex">Today's Deals</li>
                <li className="headerHover hidden md:inline-flex">Customer Service</li>
                <li className="headerHover hidden md:inline-flex">Gift Cards</li>
                <li className="headerHover hidden md:inline-flex">Registry</li>
                <li className="headerHover hidden md:inline-flex">Sell</li>
            </ul>
            {/* ===================== ItemsList End here ========================== */}
            {/* ===================== sideNav starts here ========================== */}
            {sideBar && (
                <div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-50'>
                    <div className='w-full h-full relative'>
                        <motion.div ref={ref} initial={{x:-500, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.5}} className='w-[80%] mdl:w-[350px] h-full bg-white border border-black'>
                            <div className='w-full flex'>
                                <div className='w-full bg-amazon_light text-white pl-6 flex items-center gap-4'>
                                    <AccountCircleIcon />
                                    <h3 className='font-titleFont font-bold text-lg tracking-wide'>Hello, sign in</h3> {/* We can add the close button next to this h3 */}
                                </div>
                                <span onClick={() => setSideBar(false)} className='cursor-pointer w-[50px] h-[44px] left-[286px] mdl:left-[360px] text-black flex items-center justify-center border-b-[1px] border-b-amazon_blue bg-gray-200 hover:bg-red-500 hover:text-white duration-300'>
                                    <CloseIcon />
                                </span>
                            </div>
                            <SideNavContent 
                                title="Digital Content & Devices"
                                one="Amazon Music"
                                two="Kindle E-readers & Books"
                                three="Amazon Appstore"
                            />
                            <SideNavContent
                                title="Shop By Department"
                                one="Electronics"
                                two="Computers"
                                three="Smart Home"
                            />
                            <SideNavContent
                                title="Programs & Features"
                                one="Gift Cards"
                                two="Amazon live"
                                three="International Shopping"
                            />
                            <SideNavContent
                                title="Help & Settings"
                                one="Your Account"
                                two="Customer Service"
                                three="Contact us"
                            />
                            {/* <span onClick={() => setSideBar(false)} className='cursor-pointer absolute w-[44px] h-[44px] top-0 left-[80%] mdl:left-[360px] text-black flex items-center justify-center bg-gray-200 hover:bg-red-500 hover:text-white duration-300'>
                                <CloseIcon />
                            </span> */}
                        </motion.div>
                    </div>
                </div>
            )}
            {/* ===================== sideNav End here ========================== */}
        </div>
    )
}

export default HeaderBottom