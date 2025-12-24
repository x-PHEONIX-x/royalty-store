"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import {
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "./ui/sheet";

const formSchema = z.object({
	amount: z
		.number()
		.min(1, { message: "Amount Must be at least 1 !" })
		.max(50),
	userId: z.string().min(1, { message: "User Id is Required !" }).max(50),
	fullName: z
		.string()
		.min(3, { message: "Full Name Must be at least 3 Characters" })
		.max(50),
	phone: z
		.string()
		.min(10, { message: "Phone Number Must be at least 10 Characters" })
		.max(15),
	status: z.enum(["delivered", "returned", "pending"], {
		message:
			"Status Must be one of the following: delivered, returned, pending",
	}),
});
const AddOrder = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	return (
		<div>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="mb-4">Add Order</SheetTitle>
					<SheetDescription asChild>
						<Form {...form}>
							<form className="space-y-8">
								<FormField
									control={form.control}
									name="fullName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Full Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Full Name"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This is The user Full Name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="userId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>User Id</FormLabel>
											<FormControl>
												<Input
													placeholder="User Id"
													{...field}
													disabled
												/>
											</FormControl>
											<FormDescription>
												This is the user&apos;s unique
												identifier.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<Input
													placeholder="ex : 06 99 99 99 99"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This is the user&apos;s phone
												number.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Total Amount</FormLabel>
											<FormControl>
												<Input
													placeholder="Order Total amount"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This is the Total Amount of the
												Order.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="status"
									render={({}) => (
										<FormItem>
											<FormLabel>Order Status</FormLabel>
											<FormControl>
												<Select>
													<SelectTrigger>
														<SelectValue placeholder="Select a Status" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="delivered">
															Delivered
														</SelectItem>
														<SelectItem value="returned">
															Returned
														</SelectItem>
														<SelectItem value="pending">
															Pending
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormDescription>
												This is the current Order&apos;s
												Status.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex justify-end">
									<Button type="submit">Add Order</Button>
								</div>
							</form>
						</Form>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</div>
	);
};
export default AddOrder;
