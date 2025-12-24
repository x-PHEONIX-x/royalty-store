import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
	...nextJsConfig,
	// admin-specific overrides if needed
];

export default eslintConfig;
