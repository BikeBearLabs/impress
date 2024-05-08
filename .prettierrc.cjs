module.exports = {
	trailingComma: 'all',
	useTabs: true,
	tabWidth: 4,
	singleQuote: true,
	jsxSingleQuote: true,
	endOfLine: 'lf',
	singleAttributePerLine: true,
	plugins: [
		'prettier-plugin-jsdoc',
		'prettier-plugin-tailwindcss',
		'prettier-plugin-classnames',
		'prettier-plugin-merge',
	],
	tailwindFunctions: ['clsx', 'tw'],
	customFunctions: ['clsx', 'tw'],
};
