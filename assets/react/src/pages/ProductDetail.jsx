import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/slices/cartSlice";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import currency from 'currency.js';
import axios from 'axios';


const ProductDetail = () => {
    const { id } = useParams();
    // console.log(params);

    const min = 1
    const max = 5
    const [rating] = useState(Math.floor(Math.random() * (max - min + 1) + min))
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios(`http://localhost:8000/api/products?id=${id}`).then(res => res.data);
                const productData = response.data[0];
                // console.log(productData);
                setProduct(productData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({id:product.id, title:product.title, price:product.price, description:product.description, category:product.category, image:product.image, rating:rating, quantity: 1}))
    };

    const addToWishList = async () => {
        try {
			const response = await axios.post("/api/addToWishList", JSON.stringify({"id":product.id, "title":product.title, "price":product.price, "description":product.description, "category":product.category, "image":product.image, "rating":rating}), {
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

    // if (Object.keys(product).length === 0) {
    //     return <div>Loading...</div>;
    // }

    return (        
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-2 py-2 md:py-10">
                <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-2 bg-gray-100 rounded-lg justify-center">
                    <div className="flex items-center justify-center bg-white rounded-lg relative group overflow-hidden">
                        <img alt="product image" loading="lazy" width="500" height="500" decoding="async" src={product.image} />
                    </div>
                    <div className="col-span-2 flex flex-col gap-3 justify-center items-center p-2 md:p-4">
                        <div className="flex flex-col gap-3">
                            <p className="text-xs md:text-sm text-amazon_blue font-semibold">{product.category}</p>
                            <h1 className="text-lg md:text-2xl tracking-wide font-semibold">{product.title}</h1>
                            <p className="text-sm md:text-base text-gray-600">{product.description}</p>
                            <p className="text-base text-gray flex items-center gap-1">Price: <span className="text-amazon_blue text-1g font-semibold">${product.price}</span></p>
                        </div>
                        <div className='w-full flex justify-between'>
                            <button onClick={handleAddToCart} className="w-full md:w-96 mr-2 h-12 bg-amazon_blue text-gray-200 hover:bg-amazon_yellow hover:text-amazon_blue duration-300 rounded-lg mt-5 text-base font-semibold">Add To Cart</button>
                            <button onClick={addToWishList} className="w-full md:w-96 ml-2 h-12 bg-amazon_blue text-gray-200 hover:bg-green-500 hover:text-amazon_blue duration-300 rounded-lg mt-5 text-base font-semibold">Add To Wishlist</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    );
};


export default ProductDetail;
