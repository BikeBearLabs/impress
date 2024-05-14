'use server';

import { env } from '@/env';
import type { WP_REST_API_Post } from 'wp-types';

/**
 * Returns the first item that matches {@linkcode slug}
 *
 * @example
 * 	import type { Home } from '!/acf';
 *
 * 	function getHomePostFields(): Home | undefined {
 * 		const data = await getBySlug<{ acf: Home }>('pages', 'home');
 * 		return data?.acf;
 * 	}
 */
export async function getBySlug<T extends {}>(
	type: 'posts' | 'pages' | (string & {}),
	slug: string,
) {
	try {
		const resp = await fetch(
			`https://${String(env.SITE_INTRA_HOST) || 'localhost'}/wp-json/wp/v2/${type}?slug=${slug}&acf_format=standard`,
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
