// i18n/routing.ts
import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "ar"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export const { Link, useRouter, usePathname, redirect } = createNavigation({
	locales,
	defaultLocale,
	// localePrefix: 'always' -> /en/... and /ar/...
});
