import Products from "@/app/data/products.json";
import { Product, columns } from "./columns";
import { DataTable } from "./data-table";
const getData = async (): Promise<Product[]> => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return Products.filter(
		(item) => item && typeof item.id !== "undefined"
	).map((item) => ({
		...item,
		images: Object.fromEntries(
			Object.entries(item.images ?? {}).filter(
				([, value]) => typeof value === "string"
			)
		),
	})) as Product[];
};

const ProductsPage = async () => {
	const data = await getData();
	return (
		<div className="">
			<div className="mb-8 px-4 py-2 bg-secondary rounded-md">
				<h1 className="font-semibold">All Products</h1>
			</div>
			<DataTable columns={columns} data={data} />
		</div>
	);
};

export default ProductsPage;
