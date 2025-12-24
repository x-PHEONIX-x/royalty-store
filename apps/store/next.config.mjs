// next.config.mjs
import nextIntl from "next-intl/plugin";

// If you use request.ts + routing.ts:
const withNextIntl = nextIntl({
	requestConfig: "./i18n/request.ts",
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
