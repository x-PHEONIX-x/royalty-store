import { z } from "zod";

export const buildShippingSchema = (t: (key: string) => string) =>
	z
		.object({
			name: z.string().min(1, t("nameRequired")),
			phone: z
				.string()
				.min(1, t("phoneRequired"))
				.regex(/^0[567]\d{2}\s\d{2}\s\d{2}\s\d{2}$/, t("phoneInvalid")),
			wilaya: z.string().min(1, t("wilayaRequired")),
			deliveryType: z.enum(["company", "home"] as const),
			city: z.string().optional(),
			address: z.string().optional(),
		})
		.superRefine((data, ctx) => {
			if (!data.deliveryType) {
				ctx.addIssue({
					path: ["deliveryType"],
					code: z.ZodIssueCode.custom,
					message: t("deliveryRequired"),
				});
			}

			if (data.deliveryType === "home") {
				if (!data.city || data.city.trim() === "") {
					ctx.addIssue({
						path: ["city"],
						code: z.ZodIssueCode.custom,
						message: t("cityRequired"),
					});
				}
				if (!data.address || data.address.trim() === "") {
					ctx.addIssue({
						path: ["address"],
						code: z.ZodIssueCode.custom,
						message: t("addressRequired"),
					});
				}
			}
		});

export type ShippingFormInputs = z.infer<
	ReturnType<typeof buildShippingSchema>
>;
export const buildPaymentSchema = (t: (key: string) => string) =>
	z.object({
		cardName: z.string().min(1, t("cardNameRequired")),
		cardNumber: z
			.string()
			.min(19, t("cardNumberRequired"))
			.regex(/^(?:\d{16}|\d{4}(?: \d{4}){3})$/, t("cardNumberInvalid")),
		expMonth: z
			.string()
			.min(1, t("expMonthRequired"))
			.regex(/^(0[1-9]|1[0-2])$/, t("expMonthInvalid")),
		expYear: z
			.string()
			.min(1, t("expYearRequired"))
			.regex(/^\d{2}$/, t("expYearInvalid")),
		cvv: z.string().min(3, t("cvvRequired")).max(3, t("cvvMax")),
	});

export type PaymentFormInputs = z.infer<ReturnType<typeof buildPaymentSchema>>;
