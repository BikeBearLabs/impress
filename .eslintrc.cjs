const rulesCommon = {
	// general
	'no-console': 'error',
	'dot-notation': 'off',
	'@typescript-eslint/dot-notation': 'error',
	'@typescript-eslint/consistent-type-assertions': 'off',

	// xo mods
	// https://github.com/xojs/eslint-config-xo-typescript/blob/main/index.js
	'no-labels': 'off',
	'no-unused-labels': 'off',
	'no-extra-label': 'off',
	'no-unused-vars': 'off',
	'no-eq-null': 'off',
	eqeqeq: ['error', 'always', { null: 'ignore' }],
	'@typescript-eslint/class-literal-property-style': ['error', 'fields'],
	'no-await-in-loop': 'off',
	'new-cap': 'off',
	'@typescript-eslint/array-type': [
		'error',
		{
			default: 'array',
		},
	],
	'@typescript-eslint/ban-types': [
		'error',
		{
			extendDefaults: false,
			types: {
				String: {
					message: 'Use `string` instead.',
					fixWith: 'string',
				},
				Number: {
					message: 'Use `number` instead.',
					fixWith: 'number',
				},
				Boolean: {
					message: 'Use `boolean` instead.',
					fixWith: 'boolean',
				},
				Symbol: {
					message: 'Use `symbol` instead.',
					fixWith: 'symbol',
				},
				BigInt: {
					message: 'Use `bigint` instead.',
					fixWith: 'bigint',
				},
				Object: {
					message:
						'The `Object` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead. See https://github.com/typescript-eslint/typescript-eslint/pull/848',
					fixWith: 'Record<string, unknown>',
				},
				object: {
					message:
						'The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
					fixWith: 'Record<string, unknown>',
				},
				Function:
					'Use a specific function type instead, like `() => void`.',
				null: {
					message:
						'Use `undefined` instead. See: https://github.com/sindresorhus/meta/issues/7',
					fixWith: 'undefined',
				},
				Buffer: {
					message:
						'Use Uint8Array instead. See: https://sindresorhus.com/blog/goodbye-nodejs-buffer',
					suggest: ['Uint8Array'],
				},
				'[]': "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
				'[[]]': "Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
				'[[[]]]': "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
				'[[[[]]]]': 'ur drunk 🤡',
				'[[[[[]]]]]': '🦄💥',
			},
		},
	],
	'@typescript-eslint/naming-convention': [
		'error',
		{
			selector: [
				'variable',
				'classProperty',
				'accessor',
				'objectLiteralProperty',
			],
			format: ['strictCamelCase', 'UPPER_CASE', 'StrictPascalCase'],
			leadingUnderscore: 'forbid',
			trailingUnderscore: 'forbid',
			filter: {
				regex: '(^\\d)|[^\\w$]',
				match: false,
			},
		},
		{
			selector: ['function'],
			format: ['strictCamelCase', 'StrictPascalCase'],
			leadingUnderscore: 'forbid',
			trailingUnderscore: 'forbid',
			filter: {
				regex: '(^\\d)|[^\\w$]|^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)$',
				match: false,
			},
		},
		{
			selector: [
				'parameterProperty',
				'classMethod',
				'objectLiteralMethod',
				'typeMethod',
			],
			format: ['strictCamelCase'],
			leadingUnderscore: 'forbid',
			trailingUnderscore: 'forbid',
			filter: {
				regex: '(^\\d)|[^\\w$]',
				match: false,
			},
		},
		{
			selector: 'typeLike',
			format: ['StrictPascalCase'],
		},
		{
			// interface name should not be prefixed with `I`.
			selector: 'interface',
			filter: /^(?!I)[A-Z]/.source,
			format: ['StrictPascalCase'],
		},
		{
			// type parameter name should either be `T` or a descriptive name.
			selector: 'typeParameter',
			filter: /^T$|^[A-Z][a-zA-Z]+$/.source,
			format: ['StrictPascalCase'],
		},
		{
			// type name should not be prefixed with `T`.
			selector: 'typeAlias',
			filter: /^(?!T)[A-Z]/.source,
			format: ['StrictPascalCase'],
		},
		// allow these in non-camel-case when quoted.
		{
			selector: ['classProperty', 'objectLiteralProperty'],
			format: null,
			modifiers: ['requiresQuotes'],
		},
	],
	'capitalized-comments': 'off',
	'@typescript-eslint/no-redeclare': 'off', // not recommended for new projects any more
	'no-empty-pattern': 'off',
	'func-names': 'off',

	// nestjs mods
	// allow img elements for wp-content stuff
	'@next/next/no-img-element': 'off',
	'jsx-a11y/alt-text': [
		'error',
		{
			elements: ['img', 'object', 'area', 'input[type="image"]'],
			img: [],
			object: [],
			area: [],
			'input[type="image"]': [],
		},
	],
};
const rulesTs = { ...rulesCommon };
const rulesJs = {
	...Object.fromEntries(
		Object.entries(rulesCommon).filter(
			([k]) => !k.startsWith('@typescript-eslint/'),
		),
	),
};

/** @type {import('eslint').Linter.Config} */
module.exports = {
	overrides: [
		{
			files: ['**/*.?(m|c)js?(x)'],
			extends: [
				'next/core-web-vitals',
				'xo',
				'prettier',
				'plugin:prettier/recommended',
			],
			rules: rulesJs,
		},
		{
			files: ['**/*.?(m|c)ts?(x)'],
			extends: [
				'next/core-web-vitals',
				'xo',
				'xo-typescript',
				'prettier',
				'plugin:prettier/recommended',
			],
			rules: rulesTs,
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	env: {
		node: false,
		browser: true,
	},
	plugins: ['@typescript-eslint', 'only-warn'],
	settings: {},
};
