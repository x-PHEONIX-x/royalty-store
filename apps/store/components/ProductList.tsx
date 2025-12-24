"use client";
import { Link } from "@/i18n/routing";
import type { ProductsType } from "@/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Categories from "./Categories";
import { Filter } from "./Filter";
import LazyShow from "./LazyShow";
import PaginationComponent from "./PaginationComponent";
import ProductCard from "./ProductCard";
type ProductListProps = {
	products: ProductsType;
	totalPages: number;
	currentPage: number;
	category?: string;
	params: "products" | "homePage";
	startIndex: number;
	endIndex: number;
	total: number;
};

export default function ProductList({
	products,
	totalPages,
	currentPage,
	category,
	params,
	startIndex,
	endIndex,
	total,
}: ProductListProps) {
	const tHome = useTranslations("homePage");
	const tProducts = useTranslations("productsPage");
	const productListVariants = {
		hidden: { opacity: 0, y: 12 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				delay: params === "homePage" ? 1.6 : 0.5,
				duration: 0.5,
			},
		},
	};
	return (
		<motion.div
			className="w-full container mx-auto px-8 md:px-10"
			variants={productListVariants}
			initial="hidden"
			animate="visible"
		>
			<Categories params={params} />
			{params === "products" && (
				<div className="flex flex-col-reverse md:flex-row items-center justify-between md:justify-end mx-8">
					<div className="block md:hidden">
						<PaginationComponent
							currentPage={currentPage}
							totalPages={totalPages}
						/>
						{params === "products" && (
							<div className="text-center mt-4 text-sm text-text-secondary">
								{tProducts("showingProducts", {
									from: startIndex + 1,
									to: Math.min(endIndex, total),
									total,
								})}
							</div>
						)}
					</div>
					<Filter />
				</div>
			)}
			{params === "homePage" && (
				<h1 className="text-2xl text-center font-extrabold text-shadow-sm text-shadow-gray-500 my-4">
					* {tHome("productOnSale")}{" "}
					<br className="block sm:hidden" />
					<span className="text-red-400 text-xl text-shadow-sm text-shadow-gray-800">
						{tHome("dontMissOut")}
					</span>{" "}
					*
				</h1>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12 my-6 md:my-12 mx-3 md:mx-8">
				{products.map((p, i) => (
					<LazyShow key={p.id} delay={Math.min(i * 0.05, 0.5)}>
						<ProductCard key={p.id} product={p} />
					</LazyShow>
				))}
			</div>
			{params === "products" && totalPages > 1 && (
				<PaginationComponent
					currentPage={currentPage}
					totalPages={totalPages}
				/>
			)}
			{params === "products" && (
				<div className="text-center mt-4 text-sm text-text-secondary">
					{tProducts("showingProducts", {
						from: startIndex + 1,
						to: Math.min(endIndex, total),
						total,
					})}
				</div>
			)}
			{params === "homePage" && (
				<div className="flex justify-center sm:justify-end">
					<Link
						href={
							category
								? `/products/?category=${category}`
								: "/products"
						}
						prefetch={true}
						className="mt-8 mb-16 bg-button-bg text-background ring-2 ring-background px-6 py-3 rounded-xl hover:bg-button-hover-bg hover:text-foreground hover:ring-foreground transition font-bold inline-flex items-center justify-center"
					>
						{tHome("viewAllProducts")}
					</Link>
				</div>
			)}
		</motion.div>
	);
}
