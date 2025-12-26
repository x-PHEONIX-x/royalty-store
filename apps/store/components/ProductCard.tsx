"use client";

import { Link, useRouter } from "@/i18n/routing";
import useCartStore from "@/stores/cartStore";
import type { ProductType } from "@/types";
import { playSound } from "@/utils/soundManager";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { toast } from "react-toastify";
type ProductCardProps = {
	product: ProductType;
};
type ProductTypesState = {
	color: string;
	size: string;
};

function ProductCard({ product }: ProductCardProps) {
	const t = useTranslations("productCard");
	const quantity = product.quantity ?? 99;
	const Router = useRouter();
	const [productTypes, setProductTypes] = useState({
		color: product.colors[0] as string,
		size: product.sizes[0] as string,
	});
	const mainImageSrc =
		productTypes.color in product.images
			? product.images[productTypes.color as keyof typeof product.images]
			: "https://placehold.co/400x400/png";
	const handleProductTypeChange = (
		type: keyof ProductTypesState,
		value: string
	) => {
		setProductTypes((prev) => ({ ...prev, [type]: value }));
	};
	const { addToCart } = useCartStore();
	const handleAddToCart = () => {
		addToCart({
			...product,
			quantity: 1,
			selectedColor: productTypes.color,
			selectedSize: productTypes.size,
		});
		playSound("addToCart");
		toast.success(t("addedToCartToast"), {
			onClick: () => Router.push("/cart"),
		});
	};
	return (
		<div className="flex flex-col h-full relative shadow-[4px_7px_13px_var(--product-card-shadow)] hover:shadow-[7px_10px_15px_var(--product-card-shadow-hover),-5px_10px_15px_var(--product-card-shadow-hover)] rounded-xl overflow-hidden hover:scale-102 transition-all duration-300 border border-product-card-border max-w-[300px] sm:max-w-[330px] mx-auto">
			{/* Sale Badge */}
			{product.sale != null && product.quantity != 0 && (
				<div className="absolute top-0 right-0 w-[90px] h-[90px] overflow-hidden bg-product-sale-bg text-center font-extrabold rounded-bl-[85%] rounded-tr-xl z-5 text-xl px-2 text-white text-shadow-lg shadow-lg shadow-gray-700 border-2 border-black">
					<span className="transform rotate-45 translate-y-10 translate-x-4 origin-top-right block">
						{t("onSale")}
					</span>
				</div>
			)}
			{quantity <= 9 && (
				<div className="absolute top-0 left-0 w-[90px] h-[90px] overflow-hidden bg-product-stock-bg text-center font-extrabold rounded-br-[85%] rounded-tl-xl z-5 text-sm px-2 text-white text-shadow-lg shadow-lg shadow-gray-700 border-2 border-black">
					<span className="transform -rotate-45 translate-y-12 -translate-x-2 origin-top-left block">
						{quantity > 0 ? (
							<>{t("onlyLeft", { quantity })}</>
						) : (
							<>{t("outOfStock")}</>
						)}
					</span>
				</div>
			)}
			{product.quantity === 0 && (
				<div
					className="absolute bottom-0 left-0 w-full text-center font-extrabold z-5 text-shadow-lg shadow-[1px_1px_5px_var(--product-card-shadow)] border-t-2 border border-product-card-border text-product-available-text"
					style={{ backgroundColor: "var(--product-available-bg)" }}
				>
					<span className="block px-2 py-3 text-md">
						{product.availableOn ? (
							<>
								{t("availableOn")}{" "}
								<span className="text-product-available-date text-shadow-xs text-shadow-red-950">
									{new Date(
										product.availableOn
									).toLocaleDateString(undefined, {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</>
						) : (
							<>{t("willBeAvailableSoon")}</>
						)}
					</span>
				</div>
			)}
			{/* Product Image */}
			<Link
				href={`/products/${product.id}`}
				className="block border-2 border-product-card-border shrink-0"
			>
				<div className="relative w-full aspect-square bg-card rounded-t-lg overflow-hidden">
					<Image
						src={mainImageSrc ?? "https://placehold.co/400x400/png"}
						alt={product.name}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
						className="object-cover h-full w-full"
						priority={false}
					/>
				</div>
			</Link>
			<div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4 border-2 border-product-card-border bg-product-card-bg drop-shadow-xl drop-shadow-black rounded-b-xl grow overflow-hidden">
				<h1
					dir="ltr"
					className="font-extrabold text-base sm:text-lg md:text-xl text-center text-product-card-text line-clamp-2"
				>
					{product.name}
				</h1>
				<p
					dir="ltr"
					className="text-xs sm:text-sm text-center text-product-card-text-muted line-clamp-2"
				>
					{product.shortDescription}
				</p>
				<div className="flex items-start gap-3 text-xs">
					<div className="flex flex-col gap-1">
						<span className="text-product-card-text">
							{t("size")}
						</span>
						<select
							name="size"
							id="size"
							className="ring-2 ring-product-select-ring bg-product-select-bg text-product-card-text rounded-md px-2 py-1 mt-1"
							onChange={(e) =>
								handleProductTypeChange("size", e.target.value)
							}
							value={productTypes.size}
						>
							{product.sizes.map((s) => (
								<option key={s} value={s}>
									{s.toUpperCase()}
								</option>
							))}
						</select>
					</div>
					<div className="flex flex-col gap-1 flex-1">
						<span className="text-product-card-text">
							{t("color")}
						</span>
						<div className="flex items-center gap-1 overflow-x-auto pb-2">
							{product.colors.map((color) => {
								return (
									<div
										key={color}
										className={`cursor-pointer border-2 rounded-full p-[3px] opacity-60 hover:opacity-100 transition-all duration-300`}
										style={{
											borderColor:
												productTypes.color === color
													? "var(--product-color-border)"
													: "var(--product-color-border-inactive)",
											opacity:
												productTypes.color === color
													? 1
													: 0.6,
										}}
										onClick={() =>
											handleProductTypeChange(
												"color",
												color
											)
										}
									>
										<div
											className="w-5 h-5 rounded-full"
											style={{
												backgroundColor: color,
											}}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div
					className={`${
						product.quantity === 0 ? "opacity-0" : ""
					} flex items-center justify-between mt-auto border-t border-product-card-border pt-3 sm:max-lg:flex-col sm:max-lg:items-stretch sm:max-lg:gap-2`}
				>
					<div className="flex sm:max-lg:w-full sm:max-lg:justify-center">
						{product.sale != null ? (
							<div className="flex items-baseline-1 justify-center items-center gap-1">
								<span
									className="text-xs font-bold sm:text-md"
									style={{
										color: "var(--product-price-original)",
									}}
								>
									${product.price.toFixed(2)}
								</span>
								<span
									className="text-lg md:text-xl font-bold"
									style={{
										color: "var(--product-price-sale)",
									}}
								>
									${product.sale.toFixed(2)}
								</span>
							</div>
						) : (
							<p className="font-bold text-lg md:text-2xl text-product-card-text">
								${product.price.toFixed(2)}
							</p>
						)}
					</div>

					<button
						onClick={handleAddToCart}
						disabled={product.quantity === 0}
						className="flex gap-2 items-center ring-2 ring-product-btn-ring bg-product-btn-bg hover:bg-product-btn-hover-bg hover:text-white disabled:hover:bg-product-btn-disabled px-2 sm:px-3 py-1 rounded-md shadow-lg text-md md:text-lg font-semibold cursor-pointer transition-all duration-300 text-product-card-text disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap sm:max-lg:w-full sm:max-lg:justify-center"
						style={{
							backgroundColor:
								product.quantity === 0
									? "var(--product-btn-disabled)"
									: undefined,
						}}
					>
						{t("addToCart")}
						<LuShoppingCart />
					</button>
				</div>
			</div>
		</div>
	);
}
export default React.memo(ProductCard);
