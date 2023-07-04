import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/slices/cartSlice";
import currency from 'currency.js';
import axios from 'axios';


const ProductDetail = () => {
    const { id } = useParams();
    // console.log(params);

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
        dispatch(addToCart({id: product.id,title: product.title,description: product.description,price: product.price,category: product.category,image: product.image,quantity: 1,}));
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    // if (Object.keys(product).length === 0) {
    //     return <div>Loading...</div>;
    // }

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt={product.title} className="lg:w-1/2 w-full lg:h-auto max-h-[600px] h-64 object-contain object-center rounded" src={product.image}/>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                            {product.category}
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                            {product.title}
                        </h1>
                        <div className="flex mb-4">
                            {/* Rating */}
                        </div>
                        <p className="leading-relaxed">{product.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                            {/* Size */}
                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">
                                {currency(product.price).format()}
                            </span>
                            <button onClick={handleAddToCart} className="flex ml-auto rounded-md mt-3 font-titleFont font-medium text-base bg-yellow-500 border-0 py-2 px-6 focus:outline-none bg-gradient-to-tr from-yellow-400 to-yellow-200 border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // <div className="text-gray-600">
        //     <div className='grid grid-cols-2 place-items-center'>
        //         <div className='w-full col-span-1 bg-white'>
        //             <img src={product.image} alt={product.title} />
        //         </div>
        //         <div className='col-span-1'>
        //             hello
        //         </div>
        //     </div>
        // </div>
    );
};


export default ProductDetail;
