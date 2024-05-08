import { env } from '@/env';

export function getWordpressUrl(url: string): string {
	return env.NEXT_PUBLIC_WORDPRESS_COMPONENTS_USE_RELATIVE_URL === '1'
		? url.replace(/^[a-zA-Z]+:\/\/[^/]+/, '')
		: url;
}
