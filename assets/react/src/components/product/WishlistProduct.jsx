import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import currency from 'currency.js';
import axios from 'axios';




const WishlistProduct = (props) => {

    const removeItem = async () => {
        const response = await axios.post("/api/removeFromWishList", JSON.stringify({"id":props.id}), 
            {
                headers: {"Content-Type": "application/json"}
            }
        ).then(location.reload())
        // response.status === 200 ?? 
    }

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
                            <p className='w-full text-base flex items-center justify-center bg-white inner-border-[1px] inner-border-black rounded-r-md px-1'>{currency(props.price).format()}</p>
                        </div>
                        <button className='px-[5px] text-black bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-md py-1' onClick={removeItem}>Remove item</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishlistProduct

