"use client";
import { Link, useRouter } from "@/i18n/routing";
import useCartStore from "@/stores/cartStore";
import type { CartItemsType, CartItemType, ShippingFormInputs } from "@/types";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { LuArrowRight, LuShoppingCart, LuTrash2 } from "react-icons/lu";
import { toast } from "react-toastify";
const Checkout = dynamic(() => import("@/components/Checkout"), {
	loading: () => <p>Loading checkout...</p>,
});
const ShippingForm = dynamic(() => import("@/components/ShippingForm"), {
	loading: () => <p>Loading form...</p>,
});
type ShippingDetails = {
	wilaya: string;
	city?: string;
	deliveryType: "company" | "home";
	address?: string;
	totalFee: number;
};
function CartPageContent() {
	const t = useTranslations("cart");
	const steps = [
		{
			id: 1,
			title: t("steps.1"),
		},
		{
			id: 2,
			title: t("steps.2"),
		},
		{
			id: 3,
			title: t("steps.3"),
		},
	];
	const {
		cart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
		setQuantity,
	} = useCartStore() as {
		cart: CartItemsType;
		removeFromCart: (item: CartItemType) => void;
		increaseQuantity: (item: CartItemType) => void;
		decreaseQuantity: (item: CartItemType) => void;
		setQuantity: (item: CartItemType, qty: number) => void;
	};
	const SearchParams = useSearchParams();
	const router = useRouter();
	const activeStep = parseInt(SearchParams.get("step") || "1");
	const [shippingForm, setShippingForm] = useState<ShippingFormInputs | null>(
		null
	);
	// const [shippingFormData, setShippingFormData] = useState(null);
	const handleStepClick = (stepId: number) => {
		router.push(`/cart?step=${stepId}`, { scroll: false });
	};
	const productsCount = cart.length;
	const unitsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
	const [shippingDetails, setShippingDetails] =
		useState<ShippingDetails | null>(null);
	const [shippingFee, setShippingFee] = useState(0);
	useEffect(() => {
		if (shippingDetails?.totalFee) {
			setShippingFee(shippingDetails.totalFee);
		}
	}, [shippingDetails]);
	return (
		<div className="container mx-auto w-full flex flex-col gap-5 md:gap-6 justify-center items-center mt-6 mb-4 md:mb-24">
			<h1 className="text-2xl md:text-3xl tracking-wider font-bold text-cart-title">
				<LuShoppingCart className="inline w-6 h-6" /> {t("title")}{" "}
				<LuShoppingCart className="inline w-6 h-6" />
				<hr className="border-2 mt-2 border-cart-title-border" />
			</h1>
			{/* Steps list  */}
			<div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-20 justify-center md:mt-4 md:mb-8">
				{steps.map((step) => (
					<div
						key={step.id}
						className={`flex items-center justify-center gap-2 border-b-2 pb-4 pr-3 cursor-pointer w-full whitespace-nowrap ${
							activeStep === step.id
								? "border-cart-step-border-active"
								: "border-cart-step-border"
						}`}
						onClick={() => handleStepClick(step.id)}
					>
						<div
							className={`w-10 h-10 rounded-full flex items-center justify-center ${
								activeStep === step.id
									? "bg-cart-step-bg-active text-white"
									: "bg-cart-step-bg text-cart-step-text"
							}`}
						>
							{step.id}
						</div>
						<p
							className={`flex-1 ${
								activeStep === step.id
									? "text-cart-step-title-active font-semibold"
									: "text-cart-step-title font-medium"
							}`}
						>
							{step.title}
						</p>
					</div>
				))}
			</div>
			<div className="w-full flex flex-col lg:flex-row gap-16">
				{/* Left Container  */}
				<div className="lg:w-7/12 shadow-[3px_10px_15px_-3px_var(--cart-container-shadow)] bg-cart-container-bg border border-cart-container-border p-6 rounded-lg flex flex-col gap-4 mx-4 h-max">
					{activeStep === 1 ? (
						<>
							<div className="flex justify-between items-center mb-2">
								<span className="text-2xl font-extrabold text-cart-title">
									{t("cartItems")}
								</span>
								<span className="font-semibold text-md md:text-lg text-cart-summary-value">
									{t("productsUnits", {
										products: productsCount,
										units: unitsCount,
									})}{" "}
								</span>
							</div>
							{cart.length === 0 && (
								<div className="flex flex-col gap-2 items-center justify-center m-auto">
									<h1 className="text-lg md:text-2xl text-center font-bold text-cart-title">
										{t("emptyTitle")}
									</h1>
									<Link href="/products">
										<button className="my-6 bg-cart-btn-bg text-white hover:bg-cart-btn-hover px-6 py-3 rounded-xl transition">
											{t("viewAllProducts")}
										</button>
									</Link>
								</div>
							)}
							{cart.map((item) => (
								<div
									key={
										item.id +
										item.selectedColor +
										item.selectedSize
									}
									className="flex flex-col gap-4 sm:gap-4 sm:flex-row items-center justify-between bg-cart-item-bg border border-cart-item-border shadow-[2px_2px_7px_-1px_var(--cart-container-shadow)] py-1 sm:py-3 px-4 rounded-2xl"
								>
									{/* image and details  */}
									<div className="flex flex-col sm:flex-row gap-2 sm:gap-6 md:gap-8">
										{/* Image */}
										<Link
											href={`/products/${item.id}`}
											prefetch={true}
											className="flex items-center justify-center"
										>
											<div className="relative aspect-square max-w-30 h-30 md:max-w-36 md:max-h-36 rounded-xl ring-2 ring-black overflow-hidden md:m-auto mt-2">
												<Image
													src={
														item.images[
															item.selectedColor
														] ||
														"https://placehold.co/400x400/png"
													}
													className="object-fill"
													fill
													alt="Product Image"
												/>
											</div>
										</Link>
										{/* Item Details  */}
										<div className="flex flex-col justify-between">
											<div className="flex flex-col gap-1 mb-1 sm:mb-2">
												<p className="font-extrabold text-lg mb-2 text-cart-title text-center md:text-left font-(family-name:--font-playfair) text-center">
													{item.name}
												</p>
												<div className="flex gap-2 items-center">
													<span className="font-semibold text-cart-title">
														{t("quantity")} :{" "}
													</span>
													<div className="inline-flex items-center gap-2">
														{/* Decrease button */}
														<button
															onClick={() =>
																decreaseQuantity(
																	item
																)
															}
															className="px-2 py-1 bg-cart-qty-btn-bg text-cart-title rounded-md hover:bg-cart-qty-btn-hover-bg hover:text-white transition-all duration-200 cursor-pointer"
														>
															-
														</button>

														{/* Quantity input */}
														<input
															type="number"
															min="1"
															max="99"
															value={
																item.quantity
															}
															onChange={(e) => {
																const value =
																	Math.max(
																		1,
																		Math.min(
																			99,
																			Number(
																				e
																					.target
																					.value
																			)
																		)
																	);
																setQuantity(
																	item,
																	value
																);
															}}
															className="no-spinner w-10 px-2 text-center font-bold border-2 border-cart-qty-input-border bg-form-input-bg text-cart-container-bg rounded-lg appearance-none"
														/>

														{/* Increase button */}
														<button
															onClick={() =>
																increaseQuantity(
																	item
																)
															}
															className="px-2 py-1 bg-cart-qty-btn-bg text-cart-title rounded-md hover:bg-cart-qty-btn-hover-bg hover:text-white transition-all duration-200 cursor-pointer"
														>
															+
														</button>
													</div>
												</div>
												<p>
													<span className="font-semibold text-cart-title">
														{t("size")} :{" "}
													</span>{" "}
													{item.selectedSize.toUpperCase()}
												</p>
												<p>
													<span className="font-semibold text-cart-title">
														{t("color")} :{" "}
													</span>
													{item.selectedColor.toUpperCase()}
												</p>
											</div>
											<p className="text-xl font-extrabold tracking-wide mt-1 sm:mt-2 text-green-600 dark:text-green-400">
												<span className="tracking-wider text-foreground">
													{t("price")}:{" "}
												</span>
												$
												{item.sale != null ? (
													<>
														{(
															item.sale *
															item.quantity
														).toFixed(2)}
														{item.quantity > 1 && (
															<span className="text-sm font-medium text-cart-summary-label">
																{" "}
																(
																{item.sale.toFixed(
																	2
																)}{" "}
																×{" "}
																{item.quantity})
															</span>
														)}
													</>
												) : (
													<>
														{(
															item.price *
															item.quantity
														).toFixed(2)}
														{item.quantity > 1 && (
															<span className="text-sm font-medium text-cart-summary-label">
																{" "}
																(
																{item.price.toFixed(
																	2
																)}{" "}
																×{" "}
																{item.quantity})
															</span>
														)}
													</>
												)}
											</p>
										</div>
									</div>
									{/* delete button  */}
									<button
										onClick={() => removeFromCart(item)}
										className="w-10 h-10 rounded-full text-cart-delete-text bg-cart-delete-bg hover:bg-cart-delete-hover border border-cart-delete-border md:border-red-600/50 hover:border-cart-delete-border transition-all duration-200 flex items-center justify-center cursor-pointer mb-2"
									>
										<LuTrash2 className="w-5 h-5" />
									</button>
								</div>
							))}
						</>
					) : activeStep === 2 ? (
						<>
							<p className="text-2xl font-extrabold text-cart-title">
								{t("shippingDetails")}
							</p>
							<ShippingForm
								onShippingChange={setShippingDetails}
								setShippingForm={setShippingForm}
								defaultValues={shippingForm ?? undefined}
								cartEmpty={cart.length === 0}
							/>
						</>
					) : activeStep === 3 &&
					  shippingForm &&
					  cart.length !== 0 ? (
						<>
							<p className="text-2xl font-extrabold text-cart-title">
								{t("checkoutPayment")}
							</p>
							<Checkout
								shippingForm={shippingForm}
								shippingDetails={shippingDetails}
								cartItems={cart}
								total={
									cart.reduce(
										(acc, item) =>
											acc +
											(item.sale != null
												? item.sale
												: item.price) *
												item.quantity,
										0
									) *
										0.9 +
									(shippingDetails?.totalFee ?? 0)
								}
							/>
						</>
					) : (
						<p className="m-auto text-center p-14 md:p-26 border border-cart-item-border rounded-xl w-fit bg-cart-item-bg shadow-[3px_8px_15px_-3px_var(--checkout-summary-shadow)] text-xl text-cart-title">
							{t("completePrevious")}
						</p>
					)}
				</div>
				{/* Right Container  */}
				<div className="lg:w-5/12 shadow-[2px_10px_15px_-3px_var(--cart-container-shadow)] bg-cart-container-bg border border-cart-container-border p-8 rounded-lg flex flex-col gap-8 mx-4 h-max">
					<h2 className="font-extrabold text-2xl text-cart-title">
						{t("cartDetails")}
					</h2>
					<div className="flex flex-col gap-4">
						<div className="flex justify-between text-md">
							<p className="text-cart-summary-label">
								{t("subtotal")}
							</p>
							<p className="font-semibold text-cart-summary-value">
								$
								{cart
									.reduce(
										(acc, item) =>
											acc +
											(item.sale != null
												? item.sale
												: item.price) *
												item.quantity,
										0
									)
									.toFixed(2)}
							</p>
						</div>
						<div className="flex justify-between text-md">
							<p className="text-cart-summary-label">
								{t("discount")}
							</p>
							<p className="font-semibold text-cart-discount">
								-10%
							</p>
						</div>
						<div className="flex justify-between text-md">
							<p className="text-cart-summary-label">
								{t("shippingFee")}
							</p>
							<p className="font-semibold text-cart-summary-value text-center">
								{shippingFee > 0
									? `$${shippingFee.toFixed(2)}`
									: t("shippingFeeMissing")}
							</p>
						</div>
						<hr />
						<div className="flex justify-between text-lg">
							<p className="font-bold text-cart-summary-value">
								{t("total")}
							</p>
							<p className="font-bold text-cart-summary-value">
								$
								{(
									cart.reduce(
										(acc, item) =>
											acc +
											(item.sale != null
												? item.sale
												: item.price) *
												item.quantity,
										0
									) *
										0.9 +
									shippingFee
								).toFixed(2)}
							</p>
						</div>
					</div>
					{activeStep === 1 && (
						<button
							className="flex items-center justify-center gap-4 w-full text-white shadow-[0_10px_15px_-3px_var(--cart-btn-shadow-hover)] md:shadow-[0_4px_6px_-1px_var(--cart-btn-shadow)] hover:shadow-[0_10px_15px_-3px_var(--cart-btn-shadow-hover)] text-lg font-semibold hover:bg-cart-btn-hover bg-cart-btn-bg transition-all duration-300 p-2 rounded-lg cursor-pointer"
							onClick={() => {
								cart.length > 0
									? router.push("/cart?step=2")
									: toast.error(t("emptyCartError"), {
											onClick: () => {
												router.push("/products");
											},
											position: "top-center",
											className: "text-center",
									  });
							}}
						>
							{t("continue")}
							<LuArrowRight className="w-5 h-5" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default function CartPage() {
	return (
		<Suspense fallback={<p>Loading cart...</p>}>
			<CartPageContent />
		</Suspense>
	);
}
