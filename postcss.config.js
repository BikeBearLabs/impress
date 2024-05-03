import * as p from 'node:path';

const dirname = p.dirname(new URL(import.meta.url).pathname);
const mode = process.env['NODE_ENV'];
const production = mode !== 'development';

const config = {
	plugins: /** @type {const} */ ([
		production && [
			'postcss-import-url',
			/** @satisfies {Parameters<import('postcss-import-url')>[0]} */ ({
				modernBrowser: true,
			}),
		],
		production && [
			'postcss-import',
			/** @satisfies {Parameters<import('postcss-import')>[0]} */ (
				undefined
			),
		],
		[
			'tailwindcss/nesting',
			/** @satisfies {Parameters<import('tailwindcss/nesting')>[0]} */ (
				undefined
			),
		],
		[
			'tailwindcss',
			/** @satisfies {Parameters<import('tailwindcss')>[0]} */ (
				undefined
			),
		],
		production && [
			'autoprefixer',
			/** @satisfies {Parameters<import('autoprefixer')>[0]} */ (
				undefined
			),
		],
		production && [
			'cssnano',
			/** @satisfies {Parameters<import('cssnano')>[0]} */ ({
				preset: 'default',
			}),
		],
	])
		.map((plugin) =>
			plugin ? (plugin[1] == null ? plugin[0] : plugin) : undefined,
		)
		.filter(Boolean),
};

export default config;
