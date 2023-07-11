/**
 * @param {string[]} statementTypes
 */
const alwaysPad = (...statementTypes) =>
	statementTypes
		.map(statementType => [
			{
				blankLine: "always",
				prev: "*",
				next: statementType,
			},
			{
				blankLine: "always",
				prev: statementType,
				next: "*",
			},
		])
		.flat();

/**
 * @param {[string, string[], string[]][]} statementTypeGroups
 */
const alwaysPadWithItselfAndWith = (...statementTypeGroups) =>
	statementTypeGroups
		.map(statementTypeGroup => [
			{
				blankLine: "always",
				prev: [statementTypeGroup[0], ...statementTypeGroup[1]],
				next: [statementTypeGroup[0], ...statementTypeGroup[2]],
			},
		])
		.flat();

/**
 * @param {string[]} statementTypes
 */
const alwaysPadInGroups = (...statementTypes) =>
	statementTypes
		.map(statementType => [
			...alwaysPad(statementType),
			{
				blankLine: "any",
				prev: statementType,
				next: statementType,
			},
		])
		.flat();

/**
 * @param {string[]} statementTypes
 */
const neverPadWithItself = (...statementTypes) =>
	statementTypes
		.map(statementType => [
			{
				blankLine: "never",
				prev: statementType,
				next: statementType,
			},
		])
		.flat();

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
	ignorePatterns: ["/dist/**/*"],
	plugins: ["@typescript-eslint", "import", "prettier"],

	rules: {
		"@typescript-eslint/explicit-function-return-type": "error",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-inferrable-types": "warn",
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
		"import/no-named-as-default-member": "off",
		"import/no-unresolved": "off",
		"import/order": "warn",

		"curly": ["warn", "multi-or-nest"],
		"new-cap": ["error", { capIsNew: false }],
		"no-console": "off",
		"no-inner-declarations": "off",
		"no-invalid-this": "off",
		"no-undef": "off",
		"prefer-promise-reject-errors": "off",
		"require-jsdoc": "off",
		"spaced-comment": ["error", "always", { markers: ["/"] }],
		"valid-jsdoc": "off",

		"padding-line-between-statements": [
			"warn",

			...neverPadWithItself("if"),
			...alwaysPad(
				"class",
				"directive",
				"do",
				"for",
				"function",
				"multiline-block-like",
				"multiline-const",
				"multiline-expression",
				"multiline-let",
				"switch",
				"try",
				"while"
			),
			...alwaysPadWithItselfAndWith(["case", [], ["default"]]),
			...alwaysPadInGroups("cjs-export", "cjs-import", "export", "import"),
		],

		"prettier/prettier": [
			"warn",
			{},
			{
				usePrettierrc: true,
			},
		],
	},

	overrides: [
		{
			files: ["./.eslintrc.js", "./scripts/**/*.mjs"],

			rules: {
				"@typescript-eslint/explicit-function-return-type": "off",
			},
		},
	],
};
