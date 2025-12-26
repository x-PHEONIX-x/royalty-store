"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

type LocaleCode = "en" | "ar";

const locales: { code: LocaleCode; label: string }[] = [
	{ code: "en", label: "English" },
	{ code: "ar", label: "العربية" },
];

export default function LanguageSwitcher() {
	const locale = useLocale() as LocaleCode;
	const t = useTranslations("languageSwitcher");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const STORAGE_KEY = "royalty-lang-selected";
	const handleChange = (nextLocale: string) => {
		const safeLocale = nextLocale as LocaleCode;
		if (safeLocale === locale) return;

		if (typeof window !== "undefined") {
			window.localStorage.setItem(STORAGE_KEY, safeLocale);
		}
		const query = Object.fromEntries(searchParams.entries());
		startTransition(() => {
			router.replace(
				{ pathname, query },
				{
					locale: safeLocale,
					scroll: false,
				}
			);
		});
	};

	const current = locales.find((l) => l.code === locale) ?? locales[0];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="max-w-8 max-h-8 p-1.5 mx-1 border border-black dark:border-white bg-gray-100 dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 cursor-pointer"
					disabled={isPending}
				>
					<span className="text-xs uppercase tracking-wide font-extrabold">
						{current!.code}
					</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="z-50">
				<DropdownMenuLabel
					className="text-xs font-extrabold"
					dir={locale === "ar" ? "rtl" : "ltr"}
				>
					{t("selectLanguage")}
				</DropdownMenuLabel>
				<DropdownMenuRadioGroup
					value={locale}
					onValueChange={handleChange}
					className="flex flex-col gap-1 items-center"
				>
					{locales.map((l) => (
						<DropdownMenuRadioItem
							key={l.code}
							value={l.code}
							className={`${
								locale === l.code
									? "bg-black/85 text-white dark:bg-[#b91c1c]/85"
									: " "
							}${
								locale !== l.code
									? "hover:bg-gray-200 dark:hover:text-black transition-colors duration-300"
									: ""
							} cursor-pointer w-full rounded-md font-bold`}
						>
							{l.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
