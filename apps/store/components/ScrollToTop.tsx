"use client";

import { useEffect, useState } from "react";
import { LuChevronsUp } from "react-icons/lu";

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.pageYOffset > 75);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div
			className={`group z-50 flex fixed right-5 md:right-[35px] bg-gray-200 hover:bg-gray-900 hover:shadow-[0_0_20px_#eee] border-2 border-gray-900 hover:border-white rounded-full w-[55px] lg:w-16 lg:h-16 h-[55px] justify-center items-center transition-all duration-300 ease-in-out cursor-pointer shadow-[0_0_5px_#eee] hover:scale-105 hover:bottom-[18px]
                ${isVisible ? "bottom-[15px]" : "-bottom-16 md:-bottom-20"}`}
			onClick={scrollToTop}
		>
			<LuChevronsUp className="text-black group-hover:text-white group-hover:scale-115 w-8 h-12" />
		</div>
	);
}
