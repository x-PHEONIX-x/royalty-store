"use client";

import type { UserData } from "@/Types/Types";
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
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "./ui/sheet";

type EditUserProps = {
	userData: UserData;
};
const formSchema = z.object({
	fullName: z
		.string()
		.min(4, { message: "Full Name  Must be at least 4 Characters" })
		.max(50),
	email: z.string().email({ message: "Invalid Email Address" }),
	phone: z
		.string()
		.min(10, { message: "Phone Number Must be at least 10 Characters" })
		.max(15),
	wilaya: z
		.string()
		.min(4, { message: "Wilaya Must be at least 4 Characters" })
		.max(50),
	city: z
		.string()
		.min(2, { message: "City Must be at least 2 Characters" })
		.max(50),
	address: z
		.string()
		.min(10, { message: "address Must be at least 10 Characters" })
		.max(100),
	remark: z.string().max(100).optional(),
	Role: z.enum(["Customer", "Admin", "Moderator"], {
		message: "Role Must be one of Customer, Admin, Moderator",
	}),
});
const EditUser = ({ userData }: EditUserProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: userData.userName,
			email: userData.email,
			phone: userData.phone,
			wilaya: userData.wilaya,
			city: userData.city,
			address: userData.address,
			remark: userData.remark,
			// Role: userData.Role,
		},
	});
	return (
		<div>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="mb-4">Edit User</SheetTitle>
					<SheetDescription asChild>
						<Form {...form}>
							<form className="space-y-4">
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
												This is The public Full Name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder="user email"
													{...field}
													disabled
												/>
											</FormControl>
											<FormDescription>
												Only Admins can Change the
												Email.
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
													placeholder="user phone number"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Only Admins can Change the Phone
												Number.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="wilaya"
									render={({ field }) => (
										<FormItem>
											<FormLabel>wilaya</FormLabel>
											<FormControl>
												<Input
													placeholder="user Wilaya"
													{...field}
													disabled
												/>
											</FormControl>
											<FormDescription>
												Only Admin can Change the
												Wilaya.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								{userData.city && (
									<FormField
										control={form.control}
										name="city"
										render={({ field }) => (
											<FormItem>
												<FormLabel>city</FormLabel>
												<FormControl>
													<Input
														placeholder="user city"
														{...field}
														disabled
													/>
												</FormControl>
												<FormDescription>
													Only Admin can Change the
													city.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{userData.address && (
									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormLabel>address</FormLabel>
												<FormControl>
													<Input
														placeholder="user address"
														{...field}
														disabled
													/>
												</FormControl>
												<FormDescription>
													Only Admin can Change the
													address.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								<FormField
									control={form.control}
									name="remark"
									render={({ field }) => (
										<FormItem>
											<FormLabel>remark</FormLabel>
											<FormControl>
												<Input
													placeholder="user remark"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Only Admin & Moderator can see &
												Change remark.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* <FormField
									control={form.control}
									name="Role"
									render={() => (
										<FormItem>
											<FormLabel>Role</FormLabel>
											<FormControl>
												<Select
													defaultValue={userData.Role}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select a Role" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="Admin">
															Admin
														</SelectItem>
														<SelectItem value="Customer">
															Customer
														</SelectItem>
														<SelectItem value="Moderator">
															Moderator
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormDescription>
												Only Verified Admins can change
												the Role.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/> */}
								<div className="flex justify-end pt-4">
									<Button type="submit">Save Changes</Button>
								</div>
							</form>
						</Form>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</div>
	);
};
export default EditUser;
