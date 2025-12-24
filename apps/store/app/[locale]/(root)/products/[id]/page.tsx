import ProductInteraction from "@/components/ProductInteraction";
import { Link } from "@/i18n/routing";
import { ProductType } from "@/types";
import Image from "next/image";

const product: ProductType = {
	id: 1,
	name: "Polo Shirt Premium",
	description:
		"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
	shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit.",
	price: 39.9,
	sale: 29.5,
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
};
type SearchParams = {
	searchParams?: {
		color?: string;
		size?: string;
	};
};

export const generateMetadata = async ({ searchParams }: SearchParams) => {
	const color = (await searchParams?.color) || product.colors[0];
	return {
		title: `${product.name} - ${color}`,
		description: product.description,
	};
};

const ProductPage = async ({ searchParams }: SearchParams) => {
	const selectedColor = (await searchParams?.color) ?? product.colors[0];
	const selectedSize = (await searchParams?.size) ?? product.sizes[0];

	return (
		<div className="container mx-auto flex justify-center flex-col gap-4 lg:flex-row md:gap-12 mt-4 md:mt-12">
			{/* ---------- IMAGE SECTION ---------- */}
			<div className="relative w-full rounded-sm sm:rounded-3xl lg:w-6/12 aspect-square max-h-[630px] border border-product-page-border overflow-hidden shadow-[5px_5px_15px_var(--product-page-shadow)]">
				{/* Main Image */}
				<Image
					key={selectedColor}
					src={
						product.images[selectedColor] ??
						"https://placehold.co/800x800/png"
					}
					alt={product.name}
					fill
					className="object-cover aspect-square rounded-sm sm:rounded-3xl transition-opacity duration-500 ease-in-out opacity-100"
				/>

				{/* Color Thumbnails (Overlay) */}
				<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-max max-w-full flex justify-around flex-wrap gap-1 md:gap-2 bg-thumbnail-overlay-bg p-2 rounded-md backdrop-blur-sm border-2 border-black">
					{product.colors.map((color) => (
						<Link
							key={color}
							href={`?color=${color}&size=${selectedSize}`}
							scroll={false}
							className={`relative w-14 h-14 sm:w-16 sm:h-16 xl:w-18 xl:h-18 2xl:w-20 2xl:h-20 rounded-md overflow-hidden transition-all duration-200 ${
								selectedColor === color
									? "border-[3px] border-thumbnail-border-active scale-110"
									: "border-2 border-thumbnail-border hover:border-thumbnail-border-hover"
							}`}
						>
							<Image
								src={
									product.images[color] ??
									"https://placehold.co/800x800/png"
								}
								alt={color}
								fill
								className="object-cover"
							/>
						</Link>
					))}
				</div>
			</div>

			{/* ---------- DETAILS SECTION ---------- */}
			<div className="lg:w-7/12 flex flex-col gap-2 md:gap-4 p-8 border-2 border-product-page-details-border bg-product-page-details-bg rounded-2xl shadow-[0_10px_15px_-3px_var(--product-page-shadow)] mx-4">
				<h1 className="text-2xl font-extrabold text-product-page-title text-center font-(family-name:--font-playfair)">
					{product.name}
				</h1>
				<p className="text-sm md:text-lg text-product-page-description text-center">
					{product.description}
				</p>

				<h2 className="text-3xl font-extrabold text-white dark:text-black text-center border p-2 border-foreground rounded-lg w-fit mx-auto dark:bg-white bg-black/90 font-serif tracking-wide">
					$
					{product.sale != null ? (
						<>
							{product.sale.toFixed(2)}{" "}
							<span className="text-xl font-semibold line-through text-product-page-price-sale">
								${product.price.toFixed(2)}
							</span>
						</>
					) : (
						product.price.toFixed(2)
					)}
				</h2>

				<ProductInteraction
					product={product}
					selectedColor={selectedColor}
					selectedSize={selectedSize}
				/>
			</div>
		</div>
	);
};

export default ProductPage;
