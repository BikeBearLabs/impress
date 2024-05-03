import * as fs from 'node:fs/promises';

cpIfExists('public', 'dist/public');
cpIfExists('.next/standalone', 'dist');
cpIfExists('.next/static', 'dist/.next/static');

async function cpIfExists(
	/** @type {string} */ source,
	/** @type {string} */ destination,
) {
	if (!(await fs.stat(source))) return;

	fs.cp(source, destination, { recursive: true });
}
