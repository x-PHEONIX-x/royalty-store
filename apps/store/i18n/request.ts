// i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { defaultLocale, locales, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;

	const locale = (
		locales.includes(requested as Locale) ? requested : defaultLocale
	) as Locale;

	try {
		const messages = (await import(`../messages/${locale}.json`)).default;

		return {
			locale,
			messages,
		};
	} catch {
		notFound();
	}
});
