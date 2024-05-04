import './accept-any-tls-during-development';
import type { WP_REST_API_Page } from 'wp-types';

/**
 * Returns the first page that matches {@linkcode slug}
 *
 * @example
 * 	import type { Home } from '!/acf';
 *
 * 	function getHomePageFields(): Home | undefined {
 * 		const data = await getPageBySlug<{ acf: Home }>('home');
 * 		return data?.acf;
 * 	}
 */
export async function getPageBySlug<T extends {}>(slug: string) {
	'use server';

	try {
		const resp = await fetch(
			`https://localhost/wp-json/wp/v2/pages?slug=${slug}`,
		);

		if (!resp.ok)
			throw new Error(
				`Failed to fetch page with slug ${slug}: ${resp.statusText}`,
			);

		const data = (await resp.json())[0] as WP_REST_API_Page & {
			acf: {};
		} & T;

		return data;
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e);
		return undefined;
	}
}
