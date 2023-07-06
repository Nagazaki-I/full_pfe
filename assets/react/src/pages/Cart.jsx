import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/product/CartProduct'
import currency from 'currency.js'
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { clearCart } from '../redux/slices/cartSlice'
import { motion } from "framer-motion"
import { emptyCart } from "../assets/assets"
import { Link } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'



const Cart = () => {
    const cartItems = useSelector(state => state.cart.items)
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"))

    const total = cartItems.reduce((total, item) => total += (item.price * item.quantity), 0)


    const stripePubKey = "pk_test_51NQbeaHlEtr8FNYn2BENaqnZ2PrMAiKYrajSojfciNcZSisEj3Uuazk62jvnH854LeJ6ZuK9Y3lmFEIQN2oJ8jE700TFbppcvm"
    // stripeSecretKey="sk_test_51NQbeaHlEtr8FNYnqPBDK4tErgH5jWfTespND74rlaKirAkkH9uxf2lO6u6V1wWNwHbVZ0ov0Z5q7VXFHXYHBRYs0002R0yns0"

    const stripePromise = loadStripe(stripePubKey)

    const createCheckoutSession = async () => {
        const stripe = await stripePromise
        //call the backend:
        const checkoutSessionId = await axios.post("/api/create-checkout-session",JSON.stringify({items: cartItems, email: user.email}),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        console.log(checkoutSessionId);
        const result = await stripe.redirectToCheckout({sessionId: checkoutSessionId.data.sessionId})

        if (result.error) alert(result.error.message)
    }

    // createCheckoutSession();

    return (
        <div className='w-full p-4'>
            {
                cartItems.length > 0 ? (
                    <div className='w-full grid grid-cols-5 gap-10 justify-center'> {/*h-96 removed */}
                        <div className='w-full h-full px-4 col-span-5 crt:col-span-4 bg-white rounded-[5px]'>
                            {/* Cart Header */}
                            <div className='font-titleFont hidden md:flex items-center justify-between pl-10 pr-6 py-2 border-b-[1px] border-gray-400'>
                                <h3 className='text-xl font-medium'>Products</h3>
                                <h3 className='text-xl font-medium'>Total</h3>
                            </div>
                            {/* Products */}
                            <div>
                                {
                                    cartItems.map((item) => (
                                        <CartProduct
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            price={item.price}
                                            description={item.description}
                                            category={item.category}
                                            image={item.image}
                                            rating={item.rating}
                                            quantity={item.quantity}
                                        />
                                    ))
                                }
                            </div>
                            {/* Clear Cart */}
                            <div className='flex justify-center py-5'>
                                <button className='w-48 px-4 py-2 text-base font-medium text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-md ' onClick={() => dispatch(clearCart())}>Clear Cart</button>
                            </div>
                        </div>
                        {/* Checkout side */}
                        <div className='col-span-1 xs:col-span-5 md:col-span-3 lg:col-span-3 crt:col-span-1 h-44 md:h-40 crt:h-52 bg-white flex flex-col justify-between p-4 rounded-[5px]'>
                            <div>
                                <p className='text-sm flex items-start gap-2'>
                                    <span className='text-green-500'><CheckCircleIcon /></span>
                                    Your order qualifies for FREE Shipping Choose this option at checkout. See details....
                                </p>
                            </div>
                            <div className='w-full flex flex-col justify-center gap-2'>
                                <p className='flex justify-between text-md font-semibold px-1'>
                                    Total price : <span>{currency(total).format()}</span>
                                </p>
                                <button className='h-8 px-2 text-sm font-semibold bg-yellow-400 rounded-md' onClick={createCheckoutSession}>Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>) : (

                    <div className='min-h-[299px] w-full flex flex-col slg:flex-row items-center justify-center gap-10 slg:gap-20 lg:gap-52 mb-5 slg:my-10'>
                        <motion.img className='h-52' src={emptyCart} initial={{ x:-100, opacity: 0  }} animate={{ x:0, opacity: 1  }} transition={{ delay: 0.5, duration: 0.5 }}/>
                        <motion.div className='w-[350px] flex flex-col items-center justify-center bg-white p-4 pb-5 rounded-[5px] gap-3' initial={{ x:100, opacity: 0  }} animate={{ x:0, opacity: 1  }} transition={{ delay: 0.5, duration: 0.5 }}>
                            <h1 className='font-titleFont font-semibold text-lg'>Your Cart feels lonely</h1>
                            <p className='font-base text-sm text-center'>Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and make it happy</p>
                            <Link to="/">
                                <button className="w-[250px] h-8 px-5 text-sm bg-yellow-400 rounded-md font-medium cursor-pointer hover:bg-yellow-500 active:bg-yellow-600">Continue Shopping</button> {/*removed rounded-md */}
                            </Link>
                        </motion.div>
                    </div>
                )
            }
        </div>
    )
}

export default Cart
