<?php

/**
 * Postinstall
 *
 * @package       Postinstall
 * @author        jiaSheng
 *
 * @wordpress-plugin
 * Plugin Name:       Postinstall
 * Description:       Performs post-installation cleanup & setup tasks.
 * Version:           0.0.0
 * Author:            jiaSheng
 * Requires PHP:      8.3
 * Requires at least: 6.5
 */

namespace Postinstall;

require_once(ABSPATH . 'wp-admin/includes/plugin.php');

use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function stat_exists(string $path) {
	return is_file($path) || is_dir($path);
}

function unlink_recursive(string $dir) {
	if (!stat_exists($dir)) {
		return;
	}

	$it = new RecursiveDirectoryIterator($dir);
	$files = new RecursiveIteratorIterator(
		$it,
		RecursiveIteratorIterator::CHILD_FIRST
	);
	foreach ($files as $file) {
		if ($file->isDir()) {
			rmdir($file->getPathname());
		} else {
			unlink($file->getPathname());
		}
	}
	rmdir($dir);
}

function cleanup_install_trash() {
	if (stat_exists(ABSPATH . '/wp-content/plugins/hello.php'))
		unlink(ABSPATH . '/wp-content/plugins/hello.php');
	unlink_recursive(ABSPATH . '/wp-content/plugins/akismet');
	// run twice because it fails for some files on the first run
	// for some php reason
	array_map('Postinstall\unlink_recursive', glob(ABSPATH . '/wp-content/themes/twenty*'));
	array_map('Postinstall\unlink_recursive', glob(ABSPATH . '/wp-content/themes/twenty*'));
}

/** Whether the postinstall task has been run before */
function is_fresh() {
	return stat_exists(ABSPATH . '/wp-content/plugins/hello.php');
}


if (!is_fresh()) return;

// remove misc install trash
cleanup_install_trash();

// activate acf
activate_plugin('advanced-custom-fields-pro/acf.php');

// create acf-json dir
mkdir(ABSPATH . 'wp-content/acf-json');

// activate wp-rest-cache
activate_plugin('wp-rest-cache/wp-rest-cache.php');
