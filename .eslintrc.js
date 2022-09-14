// @ts-check

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},

	extends: [
		"eslint:recommended",
		"plugin:import/typescript",
		"google",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],

	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.eslint.json"],
		sourceType: "module",
		ecmaVersion: "latest",
	},
	ignorePatterns: ["/dist/**/*", "/dist.test/**/*", "/coverage/**/*"],
	plugins: ["@typescript-eslint", "import"],

	rules: {
		"@typescript-eslint/explicit-function-return-type": "error",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-var-requires": "off",

		"import/default": "error",
		"import/export": "error",
		"import/named": "off",
		"import/namespace": "error",
		"import/newline-after-import": "warn",
		"import/no-duplicates": "warn",
		"import/no-named-as-default": "warn",
		"import/no-named-as-default-member": "warn",
		"import/no-unresolved": "off",
		"import/order": "warn",

		"new-cap": ["error", { capIsNew: false }],
		"no-console": "off",
		"no-invalid-this": "off",
		"prefer-promise-reject-errors": "off",
		"require-jsdoc": "off",
		"valid-jsdoc": "off",

		"prettier/prettier": [
			"warn",
			{},
			{
				usePrettierrc: true,
			},
		],
	},
};
