"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export const Filter = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathName = usePathname();
	const t = useTranslations("filter");
	const handleChangeFilter = (sort: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (sort === "default") {
			params.delete("sort");
		} else {
			params.set("sort", sort);
		}
		router.push(`${pathName}?${params.toString()}`, { scroll: false });
	};
	return (
		<div className="flex items-center justify-center sm:justify-end gap-2 mt-8 text-text-secondary mb-4 md:mb-0">
			<span className="font-semibold text-lg text-shadow-md text-foreground text-nowrap">
				{t("sortBy")}
			</span>
			<select
				name="sort"
				id="sort"
				className="bg-select-bg text-select-text ring-2 cursor-pointer ring-white dark:ring-black shadow-md py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring-focus transition-colors"
				onChange={(e) => handleChangeFilter(e.target.value)}
				value={searchParams.get("sort") || "default"}
			>
				<option
					value="default"
					className="bg-select-option-bg cursor-pointer text-foreground"
				>
					{t("default")}
				</option>
				<option
					value="newest"
					className="bg-select-option-bg cursor-pointer text-foreground"
				>
					{t("newest")}
				</option>
				<option
					value="oldest"
					className="bg-select-option-bg cursor-pointer text-foreground"
				>
					{t("oldest")}
				</option>
				<option
					value="asc"
					className="bg-select-option-bg cursor-pointer text-foreground"
				>
					{t("asc")}
				</option>
				<option
					value="desc"
					className="bg-select-option-bg cursor-pointer text-foreground"
				>
					{t("desc")}
				</option>
			</select>
		</div>
	);
};
