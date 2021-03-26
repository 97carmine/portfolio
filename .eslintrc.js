module.exports = {
	root: true,
	env: { es2021: true, browser: true, node: true },
	parser: "@babel/eslint-parser",
	extends: ["plugin:react/recommended", "eslint:recommended", "plugin:prettier/recommended"],
	parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
	plugins: ["react", "formatjs", "prettier"],
	rules: {
		"no-var": "error",
		"prefer-const": "error",
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"formatjs/no-offset": "error",
		"formatjs/enforce-default-message": ["error", "literal"],
		"formatjs/enforce-id": ["error", { idInterpolationPattern: "[contenthash:5]" }],
		"formatjs/no-multiple-whitespaces": ["error"],
	},
	settings: { react: { version: "detect" } },
};
