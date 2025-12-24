import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";

const popularProducts = [
	{
		id: 1,
		name: "Polo Shirt Premium",
		shortDescription:
			"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
		Description:
			"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
		price: 39.9,
		sale: 29.5,
		quantity: 7,
		sizes: ["s", "m", "l", "xl", "xxl"],
		colors: ["black", "blue", "red", "gray", "lightblue", "white"],
		images: {
			black: "/products/black-polo.jpg",
			blue: "/products/blue-polo.jpg",
			red: "/products/red-polo.jpg",
			gray: "/products/gray-polo.jpg",
			lightblue: "/products/light-blue-polo.jpg",
			white: "/products/white-polo.jpg",
		},
	},
	{
		id: 2,
		name: "Leather Chelsea Boots",
		shortDescription:
			"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
		Description:
			"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
		price: 39.9,
		quantity: 0,
		sizes: ["s", "m", "l", "xl", "xxl"],
		colors: ["brown", "black", "navy"],
		images: {
			brown: "/products/brown-boot.jpg",
			black: "/products/black-boot.jpg",
			navy: "/products/navy-boot.jpg",
		},
	},
	{
		id: 3,
		name: "Elegant Long Sleeve Shirt",
		shortDescription:
			"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
		Description:
			"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
		price: 39.9,
		quantity: 0,
		availableOn: "2025-11-01",
		sizes: ["s", "m", "l", "xl", "xxl"],
		colors: ["white", "black"],
		images: {
			white: "/products/white-shirt3.jpg",
			black: "/products/black-shirt3.jpg",
		},
	},
	{
		id: 4,
		name: "Classic Leather Shoes",
		shortDescription:
			"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
		Description:
			"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
		price: 39.9,
		sale: 25,
		quantity: 2,
		sizes: ["s", "m", "l", "xl", "xxl"],
		colors: ["black", "brown"],
		images: {
			black: "/products/black-shoes.jpg",
			brown: "/products/brown-shoes.jpg",
		},
	},
	{
		id: 5,
		name: "Leather Jacket Premium",
		shortDescription:
			"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
		Description:
			"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
		price: 49.9,
		sizes: ["s", "m", "l", "xl", "xxl"],
		colors: ["black", "brown"],
		images: {
			black: "/products/black-jacket.jpg",
			brown: "/products/brown-jacket.jpg",
		},
	},
];

const latestOrders = [
	{
		id: 1,
		title: "Order Submission",
		badge: "John Doe",
		image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
		count: 1400,
	},
	{
		id: 2,
		title: "Order Submission",
		badge: "Jane Smith",
		image: "https://images.pexels.com/photos/4969918/pexels-photo-4969918.jpeg?auto=compress&cs=tinysrgb&w=800",
		count: 2100,
	},
	{
		id: 3,
		title: "Order Submission",
		badge: "Michael Johnson",
		image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
		count: 1300,
	},
	{
		id: 4,
		title: "Order Submission",
		badge: "Lily Adams",
		image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
		count: 2500,
	},
	{
		id: 5,
		title: "Order Submission",
		badge: "Sam Brown",
		image: "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
		count: 1400,
	},
];
const CardList = ({ title }: { title: string }) => {
	// const list =
	// 	title === "Popular Products"
	// 		? popularProducts
	// 		: title === "User Orders"
	// 		? latestOrders
	// 		: latestOrders;
	return (
		<div>
			<h1 className="text-lg font-bold mb-6">{title}</h1>
			<div className="flex flex-col gap-2">
				{title === "Popular Products"
					? popularProducts.map((item) => (
							<Card
								key={item.id}
								className="flex-row items-center gap-4 p-4 justify-between"
							>
								<div className="w-12 h-12 rounded-sm relative overflow-hidden">
									<Image
										src={
											Object.values(item.images)[0] || ""
										}
										alt={item.name}
										fill
										className="object-stretch aspect-square"
									/>
								</div>
								<CardContent className="flex-1 mx-3 p-0">
									<CardTitle className="font-semibold text-sm">
										{item.name}
									</CardTitle>
									{/* <Badge variant="secondary">{item.badge}</Badge> */}
								</CardContent>
								<CardFooter className="p-0 flex items-center gap-1">
									{item.sale ? (
										<>
											<span className="text-xs text-red-400/60 line-through">
												{item.price.toFixed(2)}$
											</span>
											{item.sale.toFixed(2)}
										</>
									) : (
										item.price.toFixed(2)
									)}
									$
								</CardFooter>
							</Card>
					  ))
					: latestOrders.map((item) => (
							<Card
								key={item.id}
								className="flex-row items-center gap-4 p-4 justify-between"
							>
								<div className="w-12 h-12 rounded-sm relative overflow-hidden">
									<Image
										src={item.image}
										alt={item.title}
										fill
										className="object-cover"
									/>
								</div>
								<CardContent className="flex-1 mx-3 p-0">
									<CardTitle className="mb-2 font-medium text-sm">
										{item.title}
									</CardTitle>
									<Badge variant="secondary">
										{item.badge}
									</Badge>
								</CardContent>
								<CardFooter className="p-0">
									{item.count / 1000}K
								</CardFooter>
							</Card>
					  ))}
			</div>
		</div>
	);
};
export default CardList;
