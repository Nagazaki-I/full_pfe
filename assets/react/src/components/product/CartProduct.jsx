import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import currency from 'currency.js';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../../redux/slices/cartSlice';



const CartProduct = (props) => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items)

    const item = cartItems.find(elm => elm.id === props.id)
    const subTotal = item.quantity * item.price

    return (
        <div className='border-b-[1px] flex md:items-center justify-center md:justify-start px-2'>
            <div className="w-full flex items-center gap-12 bg-white border-gray-300 pb-3 pt-8">
                <div className='w-[160px]'>
                    <img className='object-contain' src={props.image} />
                </div>

                <div className='w-1/2 md:w-1/2'>
                    <p className='font-semibold text-base md:text-lg'>{props.title}</p>
                    <div className="text-yellow-500">
                        {
                            Array(props.rating).fill().map((_, idx) =>  // we only need the index here
                                <StarIcon className="h-5" fontSize="small" key={idx} /> // fontSize prop is case sensitive
                            )
                        }
                    </div>
                    <p className='text-xs line-clamp-2 md:line-clamp-3'>{props.description}</p> {/*className='line-clamp-2 w-[50%]' */}
                    <div className='w-1/4 grid gap-1 text-sm font-medium mt-1'>
                        <div className='w-full flex'>
                            <p className='px-2 bg-black text-white rounded-l-md py-1'>Price </p>
                            <p className='w-full text-base flex items-center justify-center bg-white inner-border-[1px] inner-border-black rounded-r-md py-'>{currency(props.price).format()}</p>
                        </div>
                        <div className='flex items-center'>
                            <p className='bg-yellow-400 px-2 rounded-l-md py-1'>Units</p>
                            <button className='bg-gray-700 text-white px-2 py-1' onClick={() => dispatch(decreaseQuantity(item))}>-</button>
                            <div className='w-8 flex items-center justify-center'>
                                <p className=''>{props.quantity}</p>
                            </div>
                            <button className='bg-gray-700 text-white px-2 rounded-r-md py-1' onClick={() => dispatch(increaseQuantity(item))}>+</button>
                        </div>
                        <button className='px-2 text-black bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-md py-1' onClick={() => dispatch(removeItem(item))}>Remove item</button>
                        <div className='px-1 mt-4 md:hidden'>
                            <p className='text-[16px] font-semibold'>Total : {currency(subTotal).format()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-2 hidden md:inline-flex'>
                <p className='text-lg font-semibold'>{currency(subTotal).format()}</p>
            </div>

        </div>
    )
}

export default CartProduct

