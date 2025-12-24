import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
	...nextJsConfig,
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
		],
	},
];

export default eslintConfig;
