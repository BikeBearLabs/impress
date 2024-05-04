<?php

/**
 * SVG Media Uploads
 *
 * @package       SVG Media Uploads
 * @author        jiaSheng
 *
 * @wordpress-plugin
 * Plugin Name:       SVG Media Uploads
 * Description:       Allow SVG uploads in WordPress media library.
 * Version:           0.0.0
 * Author:            jiaSheng
 * Requires PHP:      8.3
 * Requires at least: 6.5
 */

namespace SvgMediaUploads;

// allow svg mimetype for upload
add_filter('upload_mimes', function ($mimes) {
	$mimes['svg'] = 'image/svg+xml';

	return $mimes;
});

// fix svg previews
add_action('admin_head', function () {
	echo "
		<style>
			/* fix svg previews */
			.attachment-266x266, .thumbnail img {
				width: 100% !important;
				height: auto !important;
			}
		</style>
	";
});
