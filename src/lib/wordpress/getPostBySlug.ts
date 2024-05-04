import './accept-any-tls-during-development';
import type { WP_REST_API_Post } from 'wp-types';

/**
 * Returns the first post that matches {@linkcode slug}
 *
 * @example
 * 	import type { Home } from '!/acf';
 *
 * 	function getHomePostFields(): Home | undefined {
 * 		const data = await getPostBySlug<{ acf: Home }>('home');
 * 		return data?.acf;
 * 	}
 */
export async function getPostBySlug<T extends {}>(slug: string) {
	'use server';

	try {
		const resp = await fetch(
			`https://localhost/wp-json/wp/v2/posts?slug=${slug}`,
		);

		if (!resp.ok)
			throw new Error(
				`Failed to fetch post with slug ${slug}: ${resp.statusText}`,
			);

		const data = (await resp.json())[0] as WP_REST_API_Post & {
			acf: {};
		} & T;

		return data;
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e);
		return undefined;
	}
}
