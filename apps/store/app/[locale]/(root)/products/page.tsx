import ProductList from "@/components/ProductList";
import { ProductsType } from "@/types";
import allProducts from "../../../data/products.json";

export const metadata = {
	title: "Products | ROYALTY",
	description:
		"Browse our collection of premium fashion products available for men and women.",
};
type ProductsPageProps = {
	searchParams: Promise<{
		page?: string;
		category?: string;
	}>;
};
const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
	const params = await searchParams;
	const page = params.page ?? "1";
	const category = params.category;
	const currentPage = parseInt(page);
	const productsPerPage = 12;
	const totalPages = Math.ceil(allProducts.length / productsPerPage);
	const startIndex = (currentPage - 1) * productsPerPage;
	const products: ProductsType = (allProducts as ProductsType).slice(
		startIndex,
		startIndex + productsPerPage
	);
	return (
		<div className="mt-8">
			<ProductList
				category={category}
				params="products"
				products={products}
				currentPage={currentPage}
				totalPages={totalPages}
				startIndex={startIndex}
				endIndex={startIndex + productsPerPage}
				total={allProducts.length}
			/>
		</div>
	);
};

export default ProductsPage;
