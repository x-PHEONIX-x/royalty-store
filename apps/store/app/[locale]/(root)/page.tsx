import { LanguagePrompt } from "@/components/LanguagePrompt";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import allProducts from "../../data/products.json";
type HomePageProps = {
	searchParams: Promise<{
		category?: string;
	}>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
	const { category } = await searchParams;
	const productsPerPage = 8;
	const products = allProducts
		.filter((p) => {
			return p.sale != null;
		})
		.slice(0, productsPerPage);
	return (
		<>
			<LanguagePrompt />
			<Slider />
			<ProductList
				category={category}
				params="homePage"
				products={products}
				currentPage={1}
				totalPages={1}
				startIndex={0}
				endIndex={products.length}
				total={products.length}
			/>
		</>
	);
}
