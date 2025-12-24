import { z } from "zod";
const deliveryTypeEnum = z.enum(["company", "home"]);
export const shippingSchema = z
	.object({
		name: z.string().min(1, "Name is required!"),
		phone: z
			.string()
			.min(1, "Phone is required")
			.regex(
				/^0[567]\d{2}\s\d{2}\s\d{2}\s\d{2}$/,
				"Invalid Algerian phone number format!"
			),
		wilaya: z.string().min(1, "Wilaya is required!"),
		deliveryType: z.preprocess((val) => {
			if (val === "" || val == null) {
				throw new z.ZodError([
					{
						code: z.ZodIssueCode.custom,
						path: ["deliveryType"],
						message: "Please select a delivery method!",
					},
				]);
			}
			return val;
		}, deliveryTypeEnum),
		city: z.string().optional(),
		address: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.deliveryType === "home") {
			if (!data.city || data.city.trim() === "") {
				ctx.addIssue({
					path: ["city"],
					code: z.ZodIssueCode.custom,
					message: "City is required for home delivery!",
				});
			}
			if (!data.address || data.address.trim() === "") {
				ctx.addIssue({
					path: ["address"],
					code: z.ZodIssueCode.custom,
					message: "Address is required for home delivery!",
				});
			}
		}
	});

export const PaymentSchema = z.object({
	cardName: z.string().min(1, "Card Holder Name is required!"),
	cardNumber: z
		.string()
		.min(19, "Card Number is required!")
		.regex(/^(?:\d{16}|\d{4}(?: \d{4}){3})$/, "invalid Card Number"),

	expMonth: z
		.string()
		.min(1, "Month is required !")
		.regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),

	expYear: z
		.string()
		.min(1, "Year is required !")
		.regex(/^\d{2}$/, "Invalid year"),
	cvv: z.string().min(3, "CVV is required!").max(3, "CVV Must be 3 digits!"),
});
export type ShippingFormValues = z.infer<typeof shippingSchema>;
