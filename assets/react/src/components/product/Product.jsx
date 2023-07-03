import React, { useState, useEffect } from "react"
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { freeDelivery } from "../../assets/assets"
import currency from "currency.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { async } from "regenerator-runtime";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const min = 1
const max = 5

const Product = ({ id, title, price, description, category, image }) => {                   {/* I had to deconstructure the props arg */ }
    const [rating] = useState(Math.floor(Math.random() * (max - min + 1) + min))
    const [hasFreeShipping] = useState(Math.random() < 0.5)
    // console.log(rating);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleAddtoCart = () => dispatch(addToCart({ id, title, price, description, category, image, rating, quantity: 1 }))


    const addToWishList = async () => {
        try {
			const response = await axios.post("/api/addToWishList", JSON.stringify({"id":id, "title":title, "price":price, "description":description, "category":category, "image":image, "rating":rating}), {
				headers: {
					"Content-Type": "application/json",
				}
			});
			const data = response.data
            console.log(data)
            
		} catch (AxiosError){
			// console.error();
			if (AxiosError.response.data === "Invalid session") {
                navigate("/login")
            }
		}
    }



    return (
        <div className="relative flex flex-col m-4 bg-white p-8 z-30 rounded-xl border border-gray-300"> {/*removed z-30 for now and changed p-10 to 8*/}
            {/* Category: */}
            <p className="absolute top-1 right-2 text-xs italic text-gray-400">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
            {/* add to wish list: */}
            <FavoriteBorderIcon onClick={addToWishList} className="absolute top-1 left-2 text-gray-900 cursor-pointer"/>
            {/* Image: */}
            <div className="flex justify-center">
                <img className='w-52 h-52 object-contain' src={image} /> {/*It was props. image*/}
            </div>
            {/* Title: */}
            <h4 className="mt-3 line-clamp-2">{title}</h4>
            <div className="mt-auto">
                {/* Rating: */}
                <div className="text-yellow-500">
                    {Array(rating).fill().map((_, idx) =>  // we only need the index here
                        <StarIcon className="h-5" fontSize="small" key={idx} /> // fontSize prop is case sensitive
                    )
                    }
                </div>
                {/* Description: */}
                <p className="text-xs mt-1 line-clamp-2">{description}</p>
                {/* Price: */}
                <div className="flex items-center gap-2 mb-1 mt-2">
                    {currency(price).format()}
                    {/* {`$${price}`} */}
                    {hasFreeShipping && <img src={freeDelivery} className="h-6" />}
                </div>
                {/* Buttons : ATC + Details: */}
                <div className="flex gap-1">
                    <button className="w-full h-7 bg-yellow-400 rounded-md text-xs font-medium cursor-pointer hover:bg-yellow-500 active:bg-yellow-600" onClick={handleAddtoCart}>Add to Cart</button> {/*removed rounded-md */}
                    <button className="w-[150px] h-7 border-[1px] rounded-md border-black text-xs font-medium cursor-pointer hover:bg-black hover:text-white active:text-white active:bg-gray-800 active:border-gray-800">View Details</button> {/*removed rounded-md */}
                </div>
            </div>
        </div>

        // Add Free Shipping bellow price:
        // <div>
        //     {hasFreeShipping && (
        //         <div className="flex items-center gap-2 mt-1"> {/* use gap-2 instead of space-x-2*/}
        //             {/* <LocalShippingIcon /> */}
        //             {/* <p className="text-md text-amazon_blue">Free Delivery</p> */}
        //             <img src={freeDelivery} className="h-6 mb-1" />
        //         </div>
        //     )}
        //  </div>
    )
}

export default Product