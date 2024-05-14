import * as fs from 'node:fs';
import * as p from 'node:path';

mkDirIfNotExists('dist');

cpDirIfExists('.next/standalone', 'dist');
cpDirIfExists('public', 'dist/public');
cpDirIfExists('.next/static', 'dist/.next/static');

function mkDirIfNotExists(/** @type {string} */ path) {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
}

function cpDirIfExists(
	/** @type {string} */ source,
	/** @type {string} */ destination,
) {
	if (!fs.existsSync(source)) return;

	// eslint-disable-next-line no-console
	console.log(`copy: ${source} → ${destination}`);

	cpR(source, destination);
}

function cpR(/** @type {string} */ src, /** @type {string} */ dest) {
	const exists = fs.existsSync(src);
	const stats = exists && fs.statSync(src);
	const isDirectory = exists && stats.isDirectory();
	if (isDirectory) {
		fs.mkdirSync(dest, { recursive: true, mode: stats.mode });
		for (const childItemName of fs.readdirSync(src))
			cpR(p.join(src, childItemName), p.join(dest, childItemName));
	} else {
		fs.copyFileSync(src, dest);
	}
}
