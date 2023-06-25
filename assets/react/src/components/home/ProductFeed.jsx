import React from 'react'
// import { useLoaderData } from "react-router-dom"
import Product from '../product/Product'
import { useContext } from 'react'
import { ProductsDataContext } from '../../pages/Home'
import { advertizement } from "../../assets/assets"; 



const ProductFeed = () => {
    // const productsData = useLoaderData()  // The easiest way
    const productsData = useContext(ProductsDataContext)  // 
    // console.log(productsData);
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 -mt-12 md:-mt-20 mdl:-mt-32 lg:-mt-40'> {/* grid-flow-row-dense */}
            {
                productsData.slice(0, 4).map(({id, title, price, description, category, image}) => (  // I deconstructured the (item) arg
                    <Product 
                        key={id} // or key={item.id} 
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                )) 
            }
            <img className="md:col-span-full" src={advertizement} />
            <div className='md:col-span-2'> {/* I think this is how you can add sections like a `New Arrival` and `On Sale`, etc. */}
            {
                productsData.slice(4, 5).map(({id, title, price, description, category, image}) => ( 
                    <Product 
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                )) 
            }
            </div>
            {
                productsData.slice(5).map(({id, title, price, description, category, image}) => (
                        <Product 
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            description={description}
                            category={category}
                            image={image}
                        />
                )) 
            }
        </div>
    )
    // return (
    //     <div className='max-w-container mx-auto grid grid-cols-4 gap-10 px-4'>
    //         {
    //             productsData.map(item => (
    //                 <div className='bg-white' key={item.id}>
    //                     <div>
    //                         <img className='w-52 h-64 object-contain' src={item.image} />
    //                     </div>
    //                     <div>
    //                         <h2>{item.title}</h2>
    //                         <p>{item.price}</p>
    //                     </div>
    //                 </div>
    //             )) 
    //         }
    //         Product Component
    //     </div>
    // )
}

export default ProductFeed