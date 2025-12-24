"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import useCartStore from "@/stores/cartStore";
import type { ProductType } from "@/types";
import { playSound } from "@/utils/soundManager";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuMinus, LuPlus, LuShoppingCart } from "react-icons/lu";
import { toast } from "react-toastify";
type ProductInteractionProps = {
	product: ProductType;
	selectedColor: string;
	selectedSize: string;
};

const ProductInteraction = ({
	product,
	selectedColor,
	selectedSize,
}: ProductInteractionProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const t = useTranslations("productPage");
	const [quantity, setQuantity] = useState(1);
	const { addToCart } = useCartStore();
	const handleTypeChange = (type: "size" | "color", value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(type, value);
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};
	const handleQuantityChange = (type: "increment" | "decrement") => {
		if (type === "decrement" && quantity > 1) {
			setQuantity((prev) => prev - 1);
		} else if (type === "increment") {
			setQuantity((prev) => prev + 1);
		}
	};
	const handleAddToCart = () => {
		addToCart({
			...product,
			quantity,
			selectedColor,
			selectedSize,
		});
		playSound("addToCart");
		toast.success(t("addedToCartToast"), {
			onClick: () => router.push("/cart"),
		});
	};
	const handleBuyThisItem = () => {
		addToCart({
			...product,
			quantity,
			selectedColor,
			selectedSize,
		});
		playSound("addToCart");
		toast.success(t("addedToCartToast"), {
			onClick: () => router.push("/cart"),
		});
		router.push("/cart");
	};
	return (
		<div className="flex flex-col gap-2 md:gap-4 mt-2 md:mt-4">
			{/* Size */}
			<div className="flex flex-col gap-2">
				<span className="font-semibold text-lg text-interaction-label">
					{t("size")}
				</span>
				<div className="flex items-center gap-2">
					{product.sizes.map((size) => (
						<div
							className={`cursor-pointer border p-0.5 ${
								selectedSize === size
									? "border-interaction-size-border-active"
									: "border-interaction-size-border"
							}`}
							key={size}
							onClick={() => handleTypeChange("size", size)}
						>
							<div
								className={`w-8 h-8 flex items-center justify-center text-center font-bold text-md ${
									selectedSize === size
										? "bg-interaction-size-bg-active text-white"
										: "bg-interaction-size-bg text-interaction-size-text"
								}`}
							>
								{size.toUpperCase()}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Color */}
			<div className="flex flex-col gap-2">
				<span className="font-semibold text-lg text-interaction-label">
					{t("color")}
				</span>
				<div className="flex items-center gap-2">
					{product.colors.map((color) => (
						<div
							className={`cursor-pointer border p-0.5 ${
								selectedColor === color
									? "border-interaction-color-border-active"
									: "border-interaction-color-border"
							}`}
							key={color}
							onClick={() => handleTypeChange("color", color)}
						>
							<div
								className="w-8 h-8"
								style={{ backgroundColor: color }}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Quantity */}
			<div className="flex flex-col gap-2 mb-2">
				<span className="font-semibold text-lg text-interaction-label">
					{t("quantity")}
				</span>
				<div className="flex items-center gap-3 text-foreground">
					<button className="cursor-pointer border rounded-md border-interaction-qty-border p-1">
						<LuMinus
							className="w-5 h-5"
							onClick={() => handleQuantityChange("decrement")}
						/>
					</button>
					{quantity}
					<button className="cursor-pointer border rounded-md border-interaction-qty-border p-1">
						<LuPlus
							className="w-5 h-5"
							onClick={() => handleQuantityChange("increment")}
						/>
					</button>
				</div>
			</div>

			{/* Cart Buttons  */}
			<button
				onClick={handleAddToCart}
				className="flex items-center justify-center gap-4 my-2 md:my-0 w-full bg-interaction-btn-add-bg text-white hover:bg-interaction-btn-add-hover shadow-[3px_5px_5px_-1px_var(--interaction-btn-add-shadow-hover)] md:shadow-[0_4px_6px_-1px_var(--interaction-btn-add-shadow)] hover:shadow-[3px_5px_5px_-1px_var(--interaction-btn-add-shadow-hover)] text-lg font-semibold transition-all duration-300 p-2 rounded-lg cursor-pointer"
			>
				<LuPlus className="w-5 h-5" /> {t("addToCart")}
			</button>
			<button
				onClick={handleBuyThisItem}
				className="flex items-center justify-center gap-4 w-full bg-interaction-btn-buy-bg text-interaction-btn-buy-text hover:text-interaction-btn-buy-text-hover hover:bg-interaction-btn-buy-hover border-2 border-interaction-btn-buy-border shadow-[0_5px_12px_-3px_var(--interaction-btn-buy-shadow)] hover:shadow-[0_10px_15px_-3px_var(--interaction-btn-buy-shadow-hover)] text-lg font-semibold transition-all duration-300 p-2 rounded-lg cursor-pointer"
			>
				<LuShoppingCart className="w-5 h-5" /> {t("buyThisItem")}
			</button>
		</div>
	);
};

export default ProductInteraction;
