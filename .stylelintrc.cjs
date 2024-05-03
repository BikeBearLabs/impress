module.exports = {
	indent: 'tab',
	extends: 'stylelint-config-standard',
	defaultSeverity: 'warning',
	plugins: ['@stylistic/stylelint-plugin'],
	rules: {
		'@stylistic/string-quotes': 'single',
		'@stylistic/indentation': 'tab',
		'comment-empty-line-before': [
			'always',
			{ ignore: ['after-comment'], except: ['first-nested'] },
		],
		'declaration-empty-line-before': [
			'always',
			{ ignore: ['after-declaration', 'first-nested'] },
		],
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'responsive',
					'screen',
					'variants',
				],
			},
		],
		'function-no-unknown': [
			true,
			{
				ignoreFunctions: ['theme'],
			},
		],
		'value-keyword-case': null,
		'unit-no-unknown': null,
	},
};
