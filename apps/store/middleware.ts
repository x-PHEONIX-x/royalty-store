// middleware.ts
import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./i18n/routing";

export default createMiddleware({
	locales,
	defaultLocale,
	// Prefix all routes with locale, e.g. /en, /ar
	localePrefix: "always",
});

export const config = {
	// Match all routes except api, _next, and static files
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
