import React from 'react'
import { clearCart } from '../redux/slices/cartSlice'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';



const SuccessPage = () => {
  const dispatch = useDispatch();
  dispatch(clearCart())

  
  return (
    <div className="h-full min-h-[411px] flex flex-col gap-2 items-center justify-center py-20">
      <h1 className="text-2xl text-hoverBg font-semibold">
        Thank you for shopping in LICDA Store
      </h1>
      <Link to={"/"} className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300" onClick={() => dispatch(clearCart())}>
        <p>Continue Shopping</p>
      </Link>
    </div>
  );
};

export default SuccessPage;