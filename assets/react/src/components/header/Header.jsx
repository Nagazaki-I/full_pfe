import React, { useState, useNavigate, useEffect } from 'react'
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import { logo } from "../../assets/assets"
import { allItems } from "../../constants/consts"
import HeaderBottom from './HeaderBottom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "framer-motion"
import { getAuth, signOut } from "firebase/auth";
import { logoutUser } from '../../redux/slices/userSlice'
import axios from 'axios'




const Header = ({handleCategorySelection}) => {
  const [showAll, setShowAll] = useState(false)
  const [showProfil, setShowProfil] = useState(false)

  const cartItems = useSelector(state => state.cart.items)
  const userInfo = useSelector(state => state.user.userInfo)
  // console.log(userInfo);
  const dispatch = useDispatch()

  const auth = getAuth();
  const handleLogout = () => signOut(auth).then(() => {
    location.reload()
    dispatch(logoutUser());
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  // Search Logic:
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products/").then(response => response.data)
        const products = response.data
        // console.log(products);
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div className='mdl:sticky top-0 z-40'> {/* changed z-50 */}
      <div className='w-full bg-amazon_blue text-white px-4 py-3 flex items-center mdl:gap-4 '>
        {/* ===================== Logo ======================== */}
        <Link className='mr-auto' to="/">
          <div className='headerHover '>
            <img className='w-24 mt-2' src={logo} />
          </div>
        </Link>

        {/* ===================== Deliver ====================== */}
        <div className='headerHover hidden lgl:inline-flex'>
          <LocationOnOutlined />
          <p className='text-sm text-lightText font-light flex flex-col'>
            Deliver to <span className='font-semibold text-whiteText -mt-1'>Morocco</span>
          </p>
        </div>

        {/* ===================== Search ======================== */}
        <div className='h-8 rounded-md hidden mdl:flex flex-grow relative '>
          {/* <span onClick={() => setShowAll(!showAll)} className='w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md'>
            All 
            <ArrowDropDownOutlinedIcon />
          </span>
          {
            showAll && (
              <div>
                <ul className='absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50'>
                  {allItems.map(item => 
                    <li className='text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200' key={item._id}>{item.title}</li>
                  )}
                </ul>
              </div>
            )
          } */}
          <input className='h-full text-base text-amazon_blue flex-grow outline-none border-none px-2 rounded-l-md' type="text" onChange={(e) => setSearchQuery(e.target.value)} />
          <span className='w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md'>
            <SearchIcon />
          </span>

          {searchQuery && (
            <div className="absolute w-full mx-auto h-96 bg-gray-200 top-10 left-0 z-50 overflow-y-scroll shadow-2xl no-scrollbar cursor-pointer grid grid-cols-1 gap-4 p-4">
              {filteredProducts.map((item) => (
                <div onClick={() => {window.location.href = `/product/${item.id}`}} key={item.id} className="bg-white p-4 flex items-center gap-3 hover:bg-white cursor-pointer">
                  <img className="w-24" src={item.image} alt="productImg" />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-lg text-gray-900">{item.title}</p>
                    {/* <p className="text-xs text-gray-600">{item.description}</p> */}
                    <p className="text-base text-black flex items-center gap-1">
                      Price: <span className="text-amazon_blue text-lg font-semibold">${item.price}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* ===================== Orders ======================== */}
        <div className='hidden slg:inline-flex flex-col items-start justify-center headerHover'>
          <p className='text-xs text-lightText font-light'>Returns</p>
          <p className='text-sm font-semibold -mt-1 text-whiteText'>& Orders</p>
        </div>

        {/* ===================== Cart ========================== */}
        <Link to="/Cart">
          <div className='flex items-start justify-center headerHover relative top-[-3px] mdl:top-[3px]'> {/* change top-0.5 to : top-[-3px] mdl:top-[3px] */}
            <ShoppingCartIcon />
            <p className='text-xs font-semibold mt-2.5 text-whiteText'> {/* I modified the mt-3 to mt-2.5 */}
              Cart 
              <span className='absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center'>
                {cartItems.length} {/* The cart state that we grabbed from RTK */}
              </span>
            </p>
          </div>
        </Link>

        {/* ===================== Sign in ======================== */}
        {
          userInfo? (
            <div>
              <div className='headerHover relative' onClick={() => setShowProfil(!showProfil)}>
                <div className='flex items-center justify-center gap-1'>
                  <img src={userInfo.profilePicture} referrerPolicy="no-referrer" alt="img" className='w-8 rounded-full' />
                  <p className='text-sm font-semibold text-whiteText flex'>
                    Profil<ArrowDropDownOutlinedIcon />
                  </p>
                </div>
              </div>
              {
                showProfil && 
                  <motion.div className='absolute w-[350px] pt-4 px-4 bg-gray-100 text-black h-60 right-1 rounded-md top-[61px] mdl:top-[70px] z-50' initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.3}}>
                    <div className='grid grid-cols-1 place-items-center gap-1'>
                      <img src={userInfo.profilePicture} referrerPolicy="no-referrer" alt="img" className='w-24 rounded-full' />
                      <div>
                        <p className='text-center font-semibold'>{userInfo.name}</p>
                        <p className='text-center text-sm'>{userInfo.email}</p>
                      </div>
                      <div className='w-full flex items-center justify-center gap-2'>
                      <Link to="/wishlist" className='w-full' onClick={() => setShowProfil(!showProfil)}>
                        <button className="w-full mt-5 px-4 py-2 text-black transition-colors duration-200 rounded-md bg-green-500 hover:bg-green-600 active:outline-none active:bg-green-700">Wishlist</button>
                      </Link>
                        <button className="w-full mt-5 px-4 py-2 text-black transition-colors duration-200 rounded-md bg-red-500 hover:bg-red-600 active:outline-none active:bg-red-700" onClick={handleLogout}>Sign out</button>
                      </div>
                    </div>
                  </motion.div>
              }
            </div>
          )
          : (<Link to="/login">
              <div className='headerHover flex flex-col items-start justify-center'>
                  <p className='text-xs text-lightText font-light hidden mdl:inline-flex'>Hello, sign in</p>
                  <p className='text-sm font-semibold text-whiteText mdl:hidden flex'>Sign in</p>
                  <p className='text-sm font-semibold text-whiteText hidden mdl:inline-flex'>
                    <span>Accounts & Lists<ArrowDropDownOutlinedIcon /></span>
                  </p>
              </div>
            </Link>)
        }
      </div>
      
      {/* ===================== Search Mobile ======================== */}

      <div className='h-10 pb-2 mdl:hidden flex flex-grow px-2 bg-amazon_blue -mt-2 relative'>
        <input className='h-full text-base rounded-l-md text-amazon_blue flex-grow outline-none border-none px-2' type="text" onChange={(e) => setSearchQuery(e.target.value)} />
        <span className='w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md'>
          <SearchIcon />
        </span>

        {searchQuery && (
          <div className="absolute w-full mx-auto h-96 bg-gray-200 top-10 left-0 z-50 overflow-y-scroll shadow-2xl no-scrollbar cursor-pointer grid grid-cols-1 gap-4 p-4">
            {filteredProducts.map((item) => (
              <div onClick={() => {window.location.href = `/product/${item.id}`}} key={item.id} className="bg-white p-4 flex items-center gap-3 hover:bg-white cursor-pointer">
                <img className="w-24" src={item.image} alt="productImg" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-lg text-gray-900">{item.title}</p>
                  {/* <p className="text-xs text-gray-600">{item.description}</p> */}
                  <p className="text-base text-black flex items-center gap-1">
                    Price: <span className="text-amazon_blue text-lg font-semibold">${item.price}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      <div className=''> {/*this needs to be fixed for mobile */}
        <HeaderBottom handleCategorySelection={handleCategorySelection}/>
      </div>
    </div>
  )
}

export default Header