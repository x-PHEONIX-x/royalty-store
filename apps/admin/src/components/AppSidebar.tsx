import {
	Calendar,
	ChevronUp,
	Home,
	Inbox,
	Plus,
	Search,
	Settings,
	Shirt,
	ShoppingBasket,
	User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddCategory from "./AddCategory";
import AddOrder from "./AddOrder";
import AddProduct from "./AddProduct";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetTrigger } from "./ui/sheet";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarSeparator,
} from "./ui/sidebar";
const items = [
	{ title: "Home", href: "/", icon: Home },
	{ title: "Inbox", href: "#", icon: Inbox },
	{ title: "Calendar", href: "#", icon: Calendar },
	{ title: "Search", href: "#", icon: Search },
	{ title: "Settings", href: "#", icon: Settings },
];

const AppSidebar = () => {
	return (
		<Sidebar className="overflow-hidden" collapsible="icon">
			<SidebarHeader className="py-4">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href="/">
								<Image
									src="/logo-suit.png"
									alt="logo"
									width={26}
									height={26}
									className="bg-white rounded-sm"
								/>
								<span className="font-bold text-lg">
									Royalty Store
								</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarSeparator />

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.href}>
											<item.icon className="mr-2 h-4 w-4" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Products</SidebarGroupLabel>
					<SidebarGroupAction>
						<Plus /> <span className="sr-only">Add Product</span>
					</SidebarGroupAction>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="/products">
										<Shirt /> See All Products
									</Link>
								</SidebarMenuButton>
								<SidebarMenuSub>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton asChild>
											<Sheet>
												<SidebarMenuButton asChild>
													<SheetTrigger asChild>
														<Link href="#">
															<Plus /> Add Product
														</Link>
													</SheetTrigger>
												</SidebarMenuButton>
												<AddProduct />
											</Sheet>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								</SidebarMenuSub>
								<SidebarMenuSub>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton asChild>
											<Sheet>
												<SidebarMenuButton asChild>
													<SheetTrigger asChild>
														<Link href="#">
															<Plus /> Add
															Category
														</Link>
													</SheetTrigger>
												</SidebarMenuButton>
												<AddCategory />
											</Sheet>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								</SidebarMenuSub>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Orders</SidebarGroupLabel>
					<SidebarGroupAction>
						<Plus /> <span className="sr-only">Add Order</span>
					</SidebarGroupAction>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="/orders">
										<ShoppingBasket /> See All Orders
									</Link>
								</SidebarMenuButton>
								<SidebarMenuSub>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton asChild>
											<Sheet>
												<SidebarMenuButton asChild>
													<SheetTrigger asChild>
														<Link href="#">
															<Plus /> Add Order
														</Link>
													</SheetTrigger>
												</SidebarMenuButton>
												<AddOrder />
											</Sheet>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								</SidebarMenuSub>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 />
									Sidahmed Morsli
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Account</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem variant="destructive">
									Sign Out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
