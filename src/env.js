import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you
	 * can ensure the app isn't built with invalid env vars.
	 */
	server: {
		NODE_ENV: z.enum(['development', 'test', 'production']),
		SITE_DOMAIN: z
			.string()
			.regex(
				/^(?!http[s]?:\/\/).*/,
				'Domain should not start with protocol (http:// or https://)',
			)
			.regex(/.*(?<!\/)$/, 'Domain should not end with a slash'),
		SITE_INTRA_HOST: z.string().optional(),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you
	 * can ensure the app isn't built with invalid env vars. To expose them to
	 * the client, prefix them with `NEXT_PUBLIC_`.
	 */
	client: {
		NEXT_PUBLIC_WORDPRESS_COMPONENTS_USE_RELATIVE_URL: z.enum(['0', '1']),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge
	 * runtimes (e.g. middlewares) or client-side so we need to destruct
	 * manually.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		SITE_DOMAIN: process.env['SITE_DOMAIN'],
		SITE_INTRA_HOST: process.env['SITE_INTRA_HOST'],
		NEXT_PUBLIC_WORDPRESS_COMPONENTS_USE_RELATIVE_URL:
			process.env['NEXT_PUBLIC_WORDPRESS_COMPONENTS_USE_RELATIVE_URL'],
		// NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
	},

	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
	 * This is especially useful for Docker builds.
	 */
	skipValidation: Boolean(process.env['SKIP_ENV_VALIDATION']),
	/**
	 * Makes it so that empty strings are treated as undefined. `SOME_VAR:
	 * z.string()` and `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
});
