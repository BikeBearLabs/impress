/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This
 * is especially useful for Docker builds.
 */
await import('./src/env.js');

const development = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const config = {
	output: 'standalone',
	reactStrictMode: true,
	/**
	 * Enable the use of `.dev.ts` & `.prod.ts` pages & routes, that are only
	 * present in their specified environment
	 */
	pageExtensions: [
		...flattenSegments([['m', 'c', ''], ['t', 'j'], 's', ['x', '']]),
		'md',
		'mdx',
	].flatMap((ext) =>
		development ? [ext, `dev.${ext}`] : [ext, `prod.${ext}`],
	),
};

export default config;

/** @typedef {(string | Segments)[]} Segments */
/** @returns {string[]} */
function flattenSegments(/** @type {Segments} */ segments, current = '') {
	if (segments.length === 0) {
		return [current];
	}

	const first = segments[0];
	const rest = segments.slice(1);
	const results = [];

	if (Array.isArray(first)) {
		first.forEach((char) => {
			results.push(...flattenSegments(rest, current + char));
		});
	} else {
		results.push(...flattenSegments(rest, current + first));
	}

	return results;
}
