import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import WishlistProduct from "../components/product/WishlistProduct";
import { motion } from "framer-motion";
import { emptyCart } from "../assets/assets";
import { emptyWishlist } from "../assets/assets";
import { Link } from "react-router-dom";

const Wishlist = () => {
	const wishlist = useLoaderData();

	// console.log(wishlist);

	return (
		<div className="w-full p-4">
			{wishlist.wishList.length > 0 ? (
				<div className="w-full grid grid-cols-5 gap-10 justify-center">
					{" "}
					{/*h-96 removed */}
					<div className="w-full h-full px-4 col-span-5 crt:col-span-4 bg-white rounded-[5px]">
						{/* Cart Header */}
						<div className="font-titleFont hidden md:flex items-center justify-between pl-10 pr-6 py-2 border-b-[1px] border-gray-400">
							<h3 className="text-xl font-medium">Wishlist items</h3>
						</div>
						{/* Products */}
						<div>
							{wishlist.wishList.map(({id,title,price,description,category,image,rating}) => (
								<WishlistProduct
									key={id} // or key={item.id}
									id={id}
									title={title}
									price={price}
									description={description}
									category={category}
									image={image}
									rating={rating}
								/>
								)
							)}
						</div>
					</div>
					{/* Right side */}
					<div className="col-span-1 xs:col-span-5 md:col-span-3 lg:col-span-3 crt:col-span-1 h-16  bg-white flex flex-col justify-between p-4 rounded-[5px]">
						<Link to="/">
							<button className="w-full h-8 px-2 text-sm font-semibold bg-yellow-400 rounded-md">
								Back To Home Page
							</button>
						</Link>
					</div>
				</div>
			) : (
				<div className="min-h-[299px] w-full flex flex-col slg:flex-row items-center justify-center gap-10 slg:gap-20 lg:gap-52 mb-5 slg:my-10">
					<motion.img
						className="h-52"
						src={emptyWishlist}
						initial={{ x: -100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}
					/>
					<motion.div
						className="w-[350px] flex flex-col items-center justify-center bg-white p-4 pb-5 rounded-[5px] gap-3"
						initial={{ x: 100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}
					>
						<h1 className="font-titleFont font-semibold text-lg">
							Your Wishlist is empty
						</h1>
						<p className="font-base text-sm text-center">
						Empower your Wishlist with purpose by enriching it with 
						books, electronics, videos, and more, to bring joy and satisfaction
						</p>
						<Link to="/">
							<button className="w-[250px] h-8 px-5 text-sm bg-yellow-400 rounded-md font-medium cursor-pointer hover:bg-yellow-500 active:bg-yellow-600">
								Continue Shopping
							</button>{" "}
							{/*removed rounded-md */}
						</Link>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default Wishlist;
