import React from "react"


const FooterMiddleList = ({ title, itemsList }) => {
	return (
		<div className="w-full flex justify-start">
			<div className="w-full">
				<h3 className="w-full font-titleFont text-white text-base font-semibold mb-2 grid place-items-center md:place-items-start ">
					{title}
				</h3>
				<ul className="w-full grid place-items-center md:place-items-start gap-0.5 ">
					{itemsList.map((item) => item.listData.map((data, idx) => <li className="footerLink" key={idx}>{data}</li>))}
				</ul>
			</div>
		</div>
	);
};

export default FooterMiddleList;
