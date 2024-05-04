<?php

/**
 * Typesafe ACF
 *
 * @package       Typesafe ACF
 * @author        jiaSheng
 *
 * @wordpress-plugin
 * Plugin Name:       Typesafe ACF
 * Description:       Exposes ACF local json at wp-content/acf-json & generates typescript declarations based on them.
 * Version:           0.0.0
 * Author:            jiaSheng
 * Requires PHP:      8.3
 * Requires at least: 6.5
 */

namespace ExposeAcfJson;

if (!defined('ABSPATH')) {
	exit; // exit if accessed directly.
}

// set the save & load directory for acf json
function get_acf_json_save_dirname() {
	return ABSPATH . 'wp-content/acf-json';
}
add_filter('acf/settings/save_json', 'ExposeAcfJson\get_acf_json_save_dirname');

function get_acf_json_load_dirname(array $paths) {
	return array(get_acf_json_save_dirname());
}
add_filter('acf/settings/load_json', 'ExposeAcfJson\get_acf_json_load_dirname');

// create a typescript schema for each field group
// when a field group is updated
function escape_identifier(string $identifier) {
	return preg_replace("[^\\w$]", "_", $identifier);
}
function wrap_identifier(string $identifier) {
	return preg_match('[^a-aA-Z0-9_$]', $identifier) ? "['$identifier']" : $identifier;
}
function indent_newlines(string $string) {
	return str_replace("\n", "\n\t", $string);
}
function get_identifier_to_type_mapping(array $field) {
	$identifier = wrap_identifier($field['name']);
	$type = indent_newlines(get_type_for_field($field));

	return "$identifier: $type";
}
function get_type_for_field(array $field) {
	$type = "";
	switch ($field['type']) {
		case "text":
		case "textarea":
			$type .= "string";
			break;
		case "group":
			$type .= "{\n";
			foreach ($field['sub_fields'] as $sub_field) {
				$type .= "\t" . get_identifier_to_type_mapping($sub_field) . ";\n";
			}
			$type .= "}";
			break;
		default:
			$type .= "string";
	}
	if (!$field['required'])
		$type .= " | false";

	return $type;
}
function create_schema_ts(array $field_group) {
	$name = $field_group['title'];
	$identifier = escape_identifier($name);
	$fields = acf_get_fields($field_group);
	$code = "";

	$code .= "declare module '!/acf' {\n";
	$code .= "\texport type $identifier = {\n";
	foreach ($fields as $field) {
		$code .= "\t\t" . indent_newlines(get_identifier_to_type_mapping($field)) . ";\n";
	}
	$code .= "\t};\n";
	$code .= "}\n";

	return $code;
}
function get_schema_filename(array $field_group) {
	return get_acf_json_save_dirname() . "/{$field_group['key']}.d.ts";
}
function on_acf_update_field_group(array $field_group) {
	// enable rest api for this field group
	$field_group['show_in_rest'] = true;

	// create the typescript schema
	$schema_code = create_schema_ts($field_group);
	file_put_contents(get_schema_filename($field_group), $schema_code);
}
add_action('acf/update_field_group', 'ExposeAcfJson\on_acf_update_field_group');

// delete the typescript schema for each field group
// when a field group is deleted
function on_acf_delete_field_group(array $field_group) {
	unlink(get_schema_filename($field_group));
}
add_action('acf/delete_field_group', 'ExposeAcfJson\on_acf_delete_field_group');
