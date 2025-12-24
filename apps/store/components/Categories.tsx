"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { FaMale } from "react-icons/fa";
import {
	LuFootprints,
	LuHand,
	LuShirt,
	LuShoppingBasket,
	LuWatch,
} from "react-icons/lu";
import { PiPants } from "react-icons/pi";

type Category = {
	name: string;
	icon: ReactNode;
	slug: string;
};

const categories: Category[] = [
	{
		name: "All",
		icon: <LuShoppingBasket className="w-4 h-4" />,
		slug: "all",
	},
	{ name: "Suits", icon: <FaMale className="w-4 h-4" />, slug: "suits" },
	{ name: "Shirts", icon: <LuShirt className="w-4 h-4" />, slug: "shirts" },
	{
		name: "Shoes",
		icon: <LuFootprints className="w-4 h-4" />,
		slug: "shoes",
	},
	{ name: "Jackets", icon: <LuShirt className="w-4 h-4" />, slug: "jackets" },
	{
		name: "Accessories",
		icon: <LuWatch className="w-4 h-4" />,
		slug: "accessories",
	},
	{ name: "Pants", icon: <PiPants className="w-4 h-4" />, slug: "pants" },
	{ name: "Gloves", icon: <LuHand className="w-4 h-4" />, slug: "gloves" },
];

const categoriesContainerVariants: Variants = {
	hidden: { opacity: 0, y: 8 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			staggerChildren: 0.15,
		},
	},
};

const categoryItemVariants: Variants = {
	hidden: { opacity: 0, x: 30 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.2,
		},
	},
};

export default function Categories({
	params,
}: {
	params?: "products" | "homePage";
}) {
	const t = useTranslations("categories");
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathName = usePathname();

	const categoriesRef = useRef<HTMLDivElement | null>(null);
	const [playAnimation, setPlayAnimation] = useState(false);

	useEffect(() => {
		const id = window.setTimeout(
			() => {
				setPlayAnimation(true);
			},
			params === "homePage" ? 1800 : 400
		);

		return () => window.clearTimeout(id);
	}, []);

	const scrollToCategories = () => {
		const position = (categoriesRef.current?.offsetTop ?? 0) - 120;
		window.scrollTo({ top: position, behavior: "smooth" });
	};

	const selectedCategory = searchParams.get("category") || "all";

	useEffect(() => {
		if (selectedCategory && searchParams.get("category") !== null) {
			scrollToCategories();
		}
	}, [selectedCategory, searchParams]);

	const handleChangeCategory = (category: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("category", category || "all");
		router.push(`${pathName}?${params.toString()}`, { scroll: false });
	};

	return (
		<motion.div
			ref={categoriesRef}
			className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-category-bg p-2 rounded-lg mt-2 text-sm shadow-[4px_7px_10px_var(--product-card-shadow)] border-2 border-category-ring"
			variants={categoriesContainerVariants}
			initial="hidden"
			animate={playAnimation ? "visible" : "hidden"}
		>
			{categories.map((category) => (
				<motion.div
					key={category.name}
					variants={categoryItemVariants}
					className={`flex items-center justify-center gap-2 cursor-pointer rounded-md p-2 hover:bg-category-hover transition duration-200 font-bold tracking-wider text-md shadow-sm shadow-black ring ring-category-ring-item text-category-text ${
						category.slug === selectedCategory
							? "bg-category-selected-bg text-category-selected-text hover:bg-category-selected-bg ring-category-selected-ring"
							: ""
					}`}
					onClick={() => {
						handleChangeCategory(category.slug);
					}}
				>
					{category.icon}
					{t(category.slug as any)}
				</motion.div>
			))}
		</motion.div>
	);
}
