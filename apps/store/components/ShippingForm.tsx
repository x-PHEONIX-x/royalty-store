"use client";
import prices from "@/app/data/deliveryPrices.json";
import wilayas from "@/app/data/wilayas.json";
import { useLocale } from "next-intl";
// import { shippingSchema } from "@/app/lib/schemas";
import { useRouter } from "@/i18n/routing";
import { buildShippingSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuArrowRight } from "react-icons/lu";
import { toast } from "react-toastify";
import type { z } from "zod";
type ShippingFormValues = z.infer<ReturnType<typeof buildShippingSchema>>;
type ShippingSummary = {
	wilaya: string;
	city?: string;
	deliveryType: "company" | "home";
	address?: string;
	totalFee: number;
};

type ShippingFormProps = {
	onShippingChange: (data: ShippingSummary) => void;
	setShippingForm: (data: ShippingFormValues) => void;
	defaultValues?: Partial<ShippingFormValues>;
	cartEmpty: boolean;
};
type WilayaPrices = Record<string, number>;
type WilayaCities = Record<string, string[]>;
const ShippingForm = ({
	onShippingChange,
	setShippingForm,
	defaultValues,
	cartEmpty,
}: ShippingFormProps) => {
	const t = useTranslations("shipping");
	const locale = useLocale();
	const isRTL = locale === "ar";
	const schema = buildShippingSchema(t);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ShippingFormValues>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues ?? {
			deliveryType: "company",
		},
	});
	const router = useRouter();
	const deliveryType = watch("deliveryType");
	const wilaya = watch("wilaya");
	const city = watch("city");
	const address = watch("address");
	const baseFee =
		wilaya && (prices as WilayaPrices)[wilaya]
			? (prices as WilayaPrices)[wilaya]
			: 0;
	const totalFee = deliveryType === "home" ? baseFee + 10 : baseFee;
	const onSubmit = (data: ShippingFormValues) => {
		setShippingForm(data);
		if (!cartEmpty) {
			router.push("/cart?step=3");
		} else {
			toast.error("Your Cart is Empty, Add Products to Continue", {
				onClick: () => {
					router.push("/products");
				},
				position: "top-center",
				className: "text-center",
			});
		}
	};
	useEffect(() => {
		if (wilaya) {
			onShippingChange({
				wilaya,
				city,
				deliveryType,
				address,
				totalFee,
			});
		}
	}, [wilaya, city, deliveryType, address, onShippingChange, totalFee]);
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<label
					htmlFor="name"
					className="text-md font-bold text-form-label"
				>
					{t("name")}
				</label>
				<input
					type="text"
					id="name"
					placeholder={t("namePlaceholder")}
					{...register("name")}
					className="border-b border-input-border py-2 outline-none"
				/>
				{errors.name && (
					<p className="font-bold text-xs text-form-error">
						{errors.name.message}
					</p>
				)}
			</div>
			<div className="flex flex-col gap-1">
				<label
					htmlFor="phone"
					className="text-md font-bold text-form-label"
				>
					{t("phone")}
				</label>
				<input
					type="tel"
					id="phone"
					dir={isRTL && !watch("phone") ? "rtl" : "ltr"}
					placeholder={t("phonePlaceholder")}
					maxLength={13}
					{...register("phone", {
						onChange: (e) => {
							let value = e.target.value.replace(/\D/g, ""); // only digits

							// limit to 10 digits total
							if (value.length > 10) value = value.slice(0, 10);

							// format: 4 + 2 + 2 + 2 (e.g. 0677 99 99 99)
							let formatted = "";
							if (value.length <= 4) formatted = value;
							else if (value.length <= 6)
								formatted = `${value.slice(0, 4)} ${value.slice(
									4
								)}`;
							else if (value.length <= 8)
								formatted = `${value.slice(0, 4)} ${value.slice(
									4,
									6
								)} ${value.slice(6)}`;
							else
								formatted = `${value.slice(0, 4)} ${value.slice(
									4,
									6
								)} ${value.slice(6, 8)} ${value.slice(8, 10)}`;

							e.target.value = formatted;
						},
					})}
					className={`border-b border-input-border py-2 outline-none
    							${isRTL ? "text-right" : "text-left"}`}
				/>
				{errors.phone && (
					<p className="font-bold text-xs text-form-error">
						{errors.phone.message}
					</p>
				)}
			</div>
			<div className="flex flex-col gap-1">
				<label
					htmlFor="wilaya"
					className="text-md font-bold text-form-label"
				>
					{t("wilaya")}
				</label>
				<select
					id="wilaya"
					{...register("wilaya")}
					className="border-b border-form-input-border bg-cart-container-bg text-form-input-text py-2 outline-none w-full max-w-full"
				>
					<option value="">{t("wilayaPlaceholder")}</option>
					{Object.keys(wilayas as WilayaCities).map((w) => (
						<option key={w} value={w}>
							{w}
						</option>
					))}
				</select>
				{errors.wilaya && (
					<p className="font-bold text-xs text-form-error">
						{errors.wilaya.message}
					</p>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-md font-bold text-form-label">
					{t("deliveryMethod")}
				</p>
				<div className="flex gap-8">
					<label className="flex items-center gap-2 text-form-label">
						<input
							type="radio"
							value="company"
							{...register("deliveryType", { required: true })}
							defaultChecked={
								defaultValues?.deliveryType === "company"
							}
							className="accent-black dark:accent-white"
						/>
						{t("deliveryCompany")}
					</label>
					<label className="flex items-center gap-2 text-form-label">
						<input
							type="radio"
							value="home"
							{...register("deliveryType", { required: true })}
							className="accent-black dark:accent-white"
							defaultChecked={
								defaultValues?.deliveryType === "home"
							}
						/>
						{t("deliveryHome")}
					</label>
				</div>
				{errors.deliveryType && (
					<p className="font-bold text-xs text-form-error">
						{t("deliveryRequired")}
					</p>
				)}
			</div>
			{wilaya && deliveryType === "home" && (
				<div className="flex flex-col gap-1">
					<label
						htmlFor="city"
						className="text-md font-bold text-form-label"
					>
						{t("city")}
					</label>
					<select
						id="city"
						{...register("city", { required: t("cityRequired") })}
						className="border-b border-form-input-border bg-cart-container-bg text-form-input-text py-2 outline-none w-full max-w-full"
					>
						<option value="">{t("cityPlaceholder")}</option>
						{(wilayas as WilayaCities)[wilaya]?.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
					{errors.city && (
						<p className="font-bold text-xs text-form-error">
							{errors.city.message}
						</p>
					)}
				</div>
			)}
			{/* Address (if home delivery) */}
			{deliveryType === "home" && (
				<div className="flex flex-col gap-1">
					<label
						htmlFor="address"
						className="text-md font-bold text-form-label"
					>
						{t("address")}
					</label>
					<input
						type="text"
						id="address"
						placeholder={t("addressPlaceholder")}
						{...register("address", {
							required: t("addressRequired"),
						})}
						className="border-b border-input-border py-2 outline-none"
					/>
					{errors.address && (
						<p className="font-bold text-xs text-form-error">
							{errors.address.message}
						</p>
					)}
				</div>
			)}
			<button
				type="submit"
				className="flex items-center justify-center gap-4 w-full text-white shadow-[0_10px_15px_-3px_var(--cart-btn-shadow-hover)] md:shadow-[0_4px_6px_-1px_var(--cart-btn-shadow)] hover:shadow-[0_10px_15px_-3px_var(--cart-btn-shadow-hover)] text-lg font-semibold bg-cart-btn-bg hover:bg-cart-btn-hover transition-all duration-300 p-2 rounded-lg cursor-pointer mt-2"
			>
				{t("continue")}
				<LuArrowRight className="w-5 h-5" />
			</button>
		</form>
	);
};

export default ShippingForm;
