"use client";

import useCartStore from "@/stores/cartStore";
import { LuShoppingCart } from "react-icons/lu";
type ShoppingCartProps = {
	hiddenOnMobile: boolean;
};
const ShoppingCart = ({ hiddenOnMobile }: ShoppingCartProps) => {
	const { cart } = useCartStore();
	const cartCount = cart.reduce(
		(acc: number, item: { quantity: number }) => acc + item.quantity,
		0
	);
	return (
		<div
			className={`${
				hiddenOnMobile ? "hidden md:block" : "block"
			} relative hover:scale-120 transition-all duration-200 ease-in-out mr-0 sm:mr-0`}
		>
			<LuShoppingCart className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
			{cartCount != 0 && (
				<span className="flex absolute -top-2 -right-2 md:-top-3 md:-right-3 text-sm md:text-md ring font-bold items-center justify-center rounded-full w-5 h-5 bg-[#b91c1c] border border-black">
					<span className="text-white">{cartCount}</span>
				</span>
			)}
		</div>
	);
};

export default ShoppingCart;
