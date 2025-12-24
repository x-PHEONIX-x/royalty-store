"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/i18n/routing";
import useCartStore from "@/stores/cartStore";
import type {
	CartItemsType,
	PaymentFormInputs,
	ShippingFormInputs,
} from "@/types";
import { buildPaymentSchema } from "@/types/forms";
import { playSound } from "@/utils/soundManager";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuCircleDollarSign, LuShoppingCart } from "react-icons/lu";
import { toast } from "react-toastify";
type ShippingDetails = {
	wilaya: string;
	city?: string;
	deliveryType: "company" | "home";
	address?: string;
	totalFee: number;
};
type CheckoutProps = {
	shippingForm: ShippingFormInputs | null;
	cartItems: CartItemsType;
	total: number;
	shippingDetails: ShippingDetails | null;
};
const Checkout = ({
	shippingForm,
	cartItems,
	total,
	shippingDetails,
}: CheckoutProps) => {
	const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
	const router = useRouter();
	const { clearCart } = useCartStore();
	const tCheckout = useTranslations("checkout");
	const tPayment = useTranslations("payment");
	const locale = useLocale();
	const isRTL = locale === "ar";
	const paymentSchema = buildPaymentSchema(tPayment);
	const onSubmit = (data: PaymentFormInputs) => {
		console.log(data);
		playSound("confirmCheckout");
		router.push("/");
		toast.success(tCheckout("orderPlaced"), {
			position: "top-center",
		});
		setTimeout(() => {
			clearCart();
		}, 1000);
	};
	function submitOrder() {
		playSound("confirmCheckout");
		router.push("/");
		toast.success(tCheckout("orderPlaced"), {
			position: "top-center",
		});
		setTimeout(() => {
			clearCart();
		}, 1000);
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		trigger,
	} = useForm<PaymentFormInputs>({
		resolver: zodResolver(paymentSchema),
		defaultValues: {
			expMonth: "",
			expYear: "",
		},
	});
	return (
		<div className="flex flex-col gap-4">
			{/* Radio options */}
			<div className="flex items-center gap-2 md:gap-4">
				<p className="text-lg md:text-xl font-extrabold text-cart-title">
					{tCheckout("paymentMethod")} :{" "}
				</p>
				<label className="flex items-center gap-2 font-bold text-form-label">
					<input
						type="radio"
						value="cod"
						checked={paymentMethod === "cod"}
						onChange={() => setPaymentMethod("cod")}
						className="accent-black dark:accent-white"
					/>
					{tCheckout("cod")}
				</label>
				<label className="flex items-center gap-2 font-bold text-form-label">
					<input
						type="radio"
						value="card"
						checked={paymentMethod === "card"}
						onChange={() => setPaymentMethod("card")}
						className="accent-black dark:accent-white"
					/>
					{tCheckout("card")}
				</label>
			</div>

			{/* Animated container with smooth height */}
			<motion.div
				layout
				className="overflow-hidden"
				transition={{ duration: 0.4, ease: "easeInOut" }}
			>
				<AnimatePresence mode="wait">
					{paymentMethod === "cod" ? (
						<motion.div
							key="cod"
							initial={{ opacity: 0, x: -70 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 70 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}
							className="flex flex-col gap-4 pb-2"
						>
							<div className="bg-checkout-summary-bg shadow-[2px_4px_6px_-1px_var(--checkout-summary-shadow)] border-2 border-checkout-summary-border rounded-2xl p-4 flex flex-col gap-2 mb-2">
								<h3 className="text-xl font-extrabold mb-2 text-cart-title">
									{tCheckout("orderSummary")}
								</h3>
								<p className="text-cart-summary-value">
									<span className="font-extrabold text-cart-title mr-1">
										{tCheckout("name")} :
									</span>
									{"  "}
									{shippingForm?.name}
								</p>
								<p className="text-cart-summary-value">
									<span className="font-extrabold text-cart-title mr-1">
										{tCheckout("phone")} :
									</span>
									{"  "}
									<span
										dir="ltr"
										className="inline-block text-right"
									>
										{shippingForm?.phone}
									</span>
								</p>
								<p className="text-cart-summary-value">
									<span className="font-extrabold text-cart-title mr-1">
										{tCheckout("address")} :
									</span>
									{"  "}
									<span
										dir="ltr"
										className="inline-block text-right"
									>
										{shippingForm?.wilaya}
										{shippingForm?.city
											? ` - ${shippingForm.city}`
											: ""}{" "}
										{shippingForm?.address &&
											`- ${shippingForm.address}`}
									</span>
								</p>
								<p className="text-cart-summary-value">
									<span className="font-extrabold text-cart-title mr-1">
										{tCheckout("deliveryMethod")} :
									</span>
									{"  "}
									{shippingForm?.deliveryType === "home"
										? tCheckout("homeDelivery")
										: tCheckout("companyDelivery")}
								</p>
								<p className="text-cart-summary-value">
									<span className="font-extrabold text-cart-title mr-1">
										{tCheckout("items")} :
									</span>
									{"  "}
									{cartItems
										.map(
											(item) =>
												`${item.name}[${item.selectedColor}] x${item.quantity}`
										)
										.join(", ")}
								</p>
								<p className="text-cart-summary-value">
									<span className="text-lg font-extrabold text-cart-title mr-2">
										{tCheckout("totalPrice")} :
									</span>{" "}
									<span className="text-xl font-extrabold text-green-600 dark:text-green-400">
										${total.toFixed(2)}
									</span>
								</p>
								<p className="text-sm text-cart-summary-label">
									{tCheckout("estimatedDeliveryTime")}{" "}
									{shippingDetails?.wilaya}
								</p>
							</div>

							<button
								onClick={() => submitOrder()}
								className="flex items-center justify-center gap-4 mb-2 w-full text-white shadow-[0_10px_15px_-3px_var(--cart-btn-shadow-hover)] md:shadow-[0_4px_6px_-1px_var(--cart-btn-shadow)] hover:shadow-[0_10px_15px_-3px_var(--cart-btn-shadow-hover)] text-lg font-semibold bg-cart-btn-bg hover:bg-cart-btn-hover transition-all duration-300 p-2 rounded-lg cursor-pointer"
							>
								{tCheckout("confirmOrder")}
								<LuShoppingCart className="w-5 h-5" />
							</button>
						</motion.div>
					) : (
						<motion.div
							key="card"
							initial={{ opacity: 0, x: 70 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -70 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}
							className="flex flex-col gap-4 pb-2"
						>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col gap-2 bg-checkout-card-bg border-2 border-checkout-card-border shadow-[0_4px_6px_-1px_var(--checkout-card-shadow)] rounded-2xl p-4 mb-2"
							>
								<div className="flex flex-col md:flex-row justify-between">
									<h2 className="text-2xl font-extrabold mb-3 text-center text-cart-title">
										{tCheckout("cardPayment")}
									</h2>
									<div className="flex items-center gap-3 mx-3 mb-2">
										<Image
											src="/klarna.png"
											alt="klarna"
											width={75}
											height={35}
											className="rounded-lg"
										/>
										<Image
											src="/stripe.png"
											alt="stripe"
											width={75}
											height={35}
											className="rounded-lg"
										/>
										<Image
											src="/cards.png"
											alt="cards"
											width={75}
											height={35}
											className="rounded-lg"
										/>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<label
										htmlFor="fullName"
										className="text-md font-extrabold text-form-label"
									>
										{tPayment("cardHolderName")}
									</label>
									<input
										type="text"
										id="fullName"
										placeholder={tPayment(
											"cardHolderPlaceholder"
										)}
										{...register("cardName")}
										className="border-2 border-checkout-card-input-border bg-checkout-card-input-bg text-form-input-text p-2 rounded-lg"
									/>
									{errors.cardName && (
										<p className="font-bold text-sm text-form-error">
											{errors.cardName.message}
										</p>
									)}
								</div>
								<div className="flex flex-col gap-1">
									<label
										htmlFor="cardNumber"
										className="text-md font-extrabold text-form-label"
									>
										{tPayment("cardNumber")}
									</label>
									<input
										type="text"
										id="cardNumber"
										maxLength={19}
										placeholder={tPayment(
											"cardNumberPlaceholder"
										)}
										{...register("cardNumber", {
											onChange: (e) => {
												let value =
													e.target.value.replace(
														/\D/g,
														""
													);
												value =
													value
														.match(/.{1,4}/g)
														?.join(" ") || "";
												e.target.value = value;
											},
										})}
										className="border-2 border-checkout-card-input-border bg-checkout-card-input-bg text-form-input-text p-2 rounded-lg"
									/>
									{errors.cardNumber && (
										<p className="font-bold text-sm text-form-error">
											{errors.cardNumber.message}
										</p>
									)}
								</div>
								<div className="flex gap-2 flex-1 h-max">
									<div className="flex flex-col flex-1 gap-1">
										<label className="text-md font-extrabold text-form-label">
											{tPayment("expMonth")}
										</label>
										<Select
											name="expMonth"
											value={watch("expMonth")}
											onValueChange={(val) => {
												setValue("expMonth", val);
												trigger("expMonth");
											}}
										>
											<SelectTrigger
												className={`border-2 border-checkout-card-input-border bg-checkout-card-input-bg text-form-input-text rounded-lg h-10 flex items-center
            												${isRTL ? "justify-end text-right" : "justify-start text-left"}`}
											>
												<SelectValue
													placeholder={tPayment(
														"monthPlaceholder"
													)}
												/>
											</SelectTrigger>
											<SelectContent
												dir={isRTL ? "rtl" : "ltr"}
											>
												{Array.from(
													{ length: 12 },
													(_, i) => (
														<SelectItem
															key={i + 1}
															value={String(
																i + 1
															).padStart(2, "0")}
															className="cursor-pointer hover:bg-muted data-[highlighted]:bg-muted"
														>
															{String(
																i + 1
															).padStart(2, "0")}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										{errors.expMonth && (
											<p className="font-bold text-sm text-form-error">
												{errors.expMonth.message}
											</p>
										)}
									</div>

									<div className="flex flex-col flex-1 gap-1">
										<label className="text-md font-extrabold text-form-label">
											{tPayment("expYear")}
										</label>
										<Select
											name="expYear"
											value={watch("expYear")}
											onValueChange={(val) => {
												setValue("expYear", val);
												trigger("expYear");
											}}
										>
											<SelectTrigger
												className={`border-2 border-checkout-card-input-border bg-checkout-card-input-bg text-form-input-text rounded-lg h-10 flex items-center
            												${isRTL ? "justify-end text-right" : "justify-start text-left"}`}
											>
												<SelectValue
													placeholder={tPayment(
														"yearPlaceholder"
													)}
												/>
											</SelectTrigger>
											<SelectContent
												dir={isRTL ? "rtl" : "ltr"}
											>
												{Array.from(
													{ length: 10 },
													(_, i) => {
														const year =
															new Date().getFullYear() +
															i;
														return (
															<SelectItem
																key={year}
																value={String(
																	year
																).slice(-2)}
																className="cursor-pointer hover:bg-muted data-[highlighted]:bg-muted"
															>
																{year}
															</SelectItem>
														);
													}
												)}
											</SelectContent>
										</Select>
										{errors.expYear && (
											<p className="font-bold text-sm text-form-error">
												{errors.expYear.message}
											</p>
										)}
									</div>
								</div>

								{/* CVV INPUT --- this was missing a wrapper closing div */}
								<div className="flex flex-col gap-1 flex-1 h-max">
									<label
										htmlFor="cvv"
										className="text-md font-extrabold text-form-label"
									>
										{tPayment("cvv")}
									</label>
									<input
										type="text"
										id="cvv"
										placeholder={tPayment("cvvPlaceholder")}
										maxLength={3}
										{...register("cvv")}
										className="border-2 border-checkout-card-input-border bg-checkout-card-input-bg text-form-input-text p-2 rounded-lg"
									/>
									{errors.cvv && (
										<p className="font-bold text-sm text-form-error">
											{errors.cvv.message}
										</p>
									)}
								</div>
								{/* </div> */}
								<button
									type="submit"
									className="flex items-center justify-center gap-4 my-2 w-full text-white shadow-[0_10px_15px_-3px_var(--cart-btn-shadow-hover)] md:shadow-[0_4px_6px_-1px_var(--cart-btn-shadow)] hover:shadow-[0_10px_15px_-3px_var(--cart-btn-shadow-hover)] text-lg font-semibold bg-cart-btn-bg hover:bg-cart-btn-hover transition-all duration-300 p-2 rounded-lg cursor-pointer mt-4"
								>
									{tCheckout("confirmPayment")}
									<LuCircleDollarSign className="w-5 h-5" />
								</button>
							</form>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};

export default Checkout;
