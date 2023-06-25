import React from "react"
import FooterMiddleList from "./FooterMiddleList"
import {middleList} from "../../constants/consts"
import {logo, moroccanFlag} from "../../assets/assets"



const FooterMiddle = () => {
	return (
		<div className="w-full bg-amazon_light text-white">

			{/* ======================= Top Starts here ========================== */}
			<div className="w-full border-b-[1px] border-gray-500 py-10">
				<div className="max-w-6xl mx-auto text-gray-300">
					<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:pl-24 mdl:pl-32 lg:pl-10"> {/* added pl-10 */}
						{middleList.map((item) => 
              <FooterMiddleList key={item._id} title={item.title} itemsList={item.listItem}/>
              )}
					</div>
				</div>
			</div>

			{/* ======================= Bottom Starts here ======================= */}
      <div className="w-full flex gap-6 items-center justify-center py-6">
        <div className="w-20 pt-3">
          <img src={logo} alt="logo" />
        </div>
        <div> {/* Removed the classes as I found them useless here*/}
          <p className="border border-gray-500 cursor-pointer duration-200 px-2 py-1">English</p>
        </div>         
        <div className="flex gap-1 items-center justify-center border border-gray-500 cursor-pointer duration-200 px-2 py-1">
          <img className="w-6 " src={moroccanFlag} alt="moroccanFlag" />
          <p>Morocco</p>
        </div>
      </div>

		</div>
	);
};
// w-full flex gap-6 items-center justify-center py-6
export default FooterMiddle;
