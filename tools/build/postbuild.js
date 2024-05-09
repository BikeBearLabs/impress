import * as fs from 'node:fs/promises';

cpIfExists('public', 'dist/public');
cpIfExists('.next/standalone', 'dist');
cpIfExists('.next/static', 'dist/.next/static');

async function cpIfExists(
	/** @type {string} */ source,
	/** @type {string} */ destination,
) {
	try {
		await fs.access(source);
	} catch {
		return;
	}

	fs.cp(source, destination, { recursive: true, force: true });
}
