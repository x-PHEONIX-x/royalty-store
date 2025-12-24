import CardList from "@/components/CardList";
import EditUser from "@/components/EditUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { UserData } from "@/Types/Types";
import { BadgeAlert, BadgeCheck, BadgeX, Crown } from "lucide-react";

const SingleUserPage = () => {
	const userData: UserData = {
		Role: "Customer",
		isVerified: true,
		isAdmin: true,
		isBanned: true,
		isSuspicious: true,
		orderCount: 3,
		userName: "Sid Ahmed Morsli",
		email: "morslisidahmed95@gmail.com",
		phone: "06 71 24 95 61",
		wilaya: "Tiaret",
		city: "Sougueur",
		address: "123 Main St",
		CreatedAt: "2023-01-15",
		remark: "This user is very Reliable and punctual.",
	};
	return (
		<div>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/users">Users</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Sid Ahmed Morsli</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			{/* CONTAINER  */}
			<div className="mt-6 flex flex-col xl:flex-row gap-8">
				{/* LEFT */}
				<div className="w-full xl:w-1/3 space-y-6">
					{/* User Stats & Flags */}
					<div className="bg-primary-foreground p-4 rounded-lg">
						<h1 className="text-xl font-semibold">
							User Stats & Flags
						</h1>
						<div className="flex justify-center items-center mt-4 gap-4">
							{userData.isAdmin && (
								<HoverCard>
									<HoverCardTrigger>
										<Crown
											className="rounded-full p-2 bg-fuchsia-400/30 border border-fuchsia-600/60"
											size={44}
										/>
									</HoverCardTrigger>
									<HoverCardContent>
										<h1 className="font-bold mb-2 text-fuchsia-500 text-center">
											Admin User
										</h1>
										<p className="text-sm text-muted-foreground text-center">
											This User is an Admin
										</p>
									</HoverCardContent>
								</HoverCard>
							)}

							{userData.isVerified && (
								<HoverCard>
									<HoverCardTrigger>
										<BadgeCheck
											className="rounded-full p-2 bg-green-500/30 border border-green-600/60"
											size={44}
										/>
									</HoverCardTrigger>
									<HoverCardContent>
										<h1 className="font-bold mb-2 text-green-500 text-center">
											Verified User
										</h1>
										<p className="text-sm text-muted-foreground text-center">
											This User has been verified By the
											Admin
										</p>
									</HoverCardContent>
								</HoverCard>
							)}
							{userData.isSuspicious && (
								<HoverCard>
									<HoverCardTrigger>
										<BadgeAlert
											className="rounded-full p-2 bg-yellow-500/30 border border-yellow-600/60"
											size={44}
										/>
									</HoverCardTrigger>
									<HoverCardContent>
										<h1 className="font-bold mb-2 text-yellow-500 text-center">
											Suspicious User
										</h1>
										<p className="text-sm text-muted-foreground text-center">
											This User has been marked as
											suspicious
										</p>
									</HoverCardContent>
								</HoverCard>
							)}
							{userData.isBanned && (
								<HoverCard>
									<HoverCardTrigger>
										<BadgeX
											className="rounded-full p-2 bg-red-500/30 border border-red-600/60"
											size={44}
										/>
									</HoverCardTrigger>
									<HoverCardContent>
										<h1 className="font-bold mb-2 text-red-500 text-center">
											Banned User
										</h1>
										<p className="text-sm text-muted-foreground text-center">
											This User has been banned
										</p>
									</HoverCardContent>
								</HoverCard>
							)}
							{userData.orderCount > 0 && (
								<HoverCard>
									<HoverCardTrigger>
										<div className="rounded-full p-2 bg-sky-400/30 border border-sky-600/60 flex flex-col justify-center items-center w-11 h-11">
											<span className="font-bold text-lg">
												{userData.orderCount}
											</span>
										</div>
									</HoverCardTrigger>
									<HoverCardContent>
										<h1 className="font-bold mb-2 text-blue-500 text-center">
											Total Orders
										</h1>
										<p className="text-sm text-muted-foreground text-center">
											This User has {userData.orderCount}{" "}
											Previous Orders Delivered.
										</p>
									</HoverCardContent>
								</HoverCard>
							)}
						</div>
						<div className="flex items-center gap-2 bg-slate-400/15 rounded-md my-6 p-2">
							<span className="text-lg font-bold text-red-500/70">
								Remark:{" "}
							</span>
							{userData.remark
								? userData.remark
								: "This User Has No Remarks"}
						</div>
					</div>
					<div className="bg-primary-foreground p-4 rounded-lg space-y-4">
						<div className="flex items-center gap-4">
							<Avatar className="size-16">
								<AvatarImage src="https://github.com/x-PHEONIX-x.png" />
								<AvatarFallback>SM</AvatarFallback>
							</Avatar>
							<h1 className="text-xl font-bold">
								Sid Ahmed Morsli
							</h1>
						</div>
						<p className="text-sm text-muted-foreground">
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Amet vero consequatur culpa tenetur suscipit
							nisi rem asperiores, necessitatibus modi debitis
							blanditiis beatae, corporis odit expedita, quasi
							odio ad tempore. At!
						</p>
					</div>
					{/* Information */}
					<div className="bg-primary-foreground p-4 rounded-lg">
						<div className="flex items-center justify-between">
							<h1 className="text-xl font-semibold">
								User Information
							</h1>
							<div className="flex items-start">
								<Sheet>
									<SheetTrigger asChild>
										<Button>Edit User</Button>
									</SheetTrigger>
									<EditUser userData={userData} />
								</Sheet>
							</div>
						</div>
						<div className="space-y-4 mt-4">
							<div className="flex items-center gap-2">
								<span className="font-bold">Full Name:</span>
								<span>{userData.userName}</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-bold">Email:</span>
								<span>{userData.email}</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-bold">Phone Number:</span>
								<span>{userData.phone}</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-bold">Wilaya:</span>
								<span>{userData.wilaya}</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-bold">City:</span>
								<span>{userData.city}</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-bold">Address:</span>
								<span>{userData.address}</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-bold">Role:</span>
								<Badge>{userData.Role}</Badge>
							</div>
							<p className="text-sm text-muted-foreground text-end">
								Joined On: {userData.CreatedAt}
							</p>
						</div>
					</div>
				</div>
				{/* RIGHT */}
				<div className="w-full xl:w-2/3 space-y-6">
					{/* Card List */}
					<div className="bg-primary-foreground p-4 rounded-lg">
						<CardList title="User Orders" />
					</div>
				</div>
			</div>
		</div>
	);
};
export default SingleUserPage;
