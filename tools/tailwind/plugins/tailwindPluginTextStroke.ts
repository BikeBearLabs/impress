import plugin from 'tailwindcss/plugin';
import { type PluginAPI } from 'tailwindcss/types/config';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

export const tailwindPluginTextStroke = plugin(
	({ matchUtilities, theme }) => {
		matchUtilities(
			{
				'text-stroke': (value: string) => ({
					'text-stroke-width': value,
					'-webkit-text-stroke-width': value,
				}),
			},
			{
				values: theme('textStrokeWidth'),
			},
		);
		const colors = flattenColorPalette(theme('colors'));
		matchUtilities(
			{
				'text-stroke'(getterOrValue) {
					const value =
						typeof getterOrValue === 'function'
							? getterOrValue({})
							: getterOrValue;
					return {
						'text-stroke-color': value,
						'-webkit-text-stroke-color': value,
					};
				},
			},
			{
				values: colors,
				type: ['color'],
			},
		);
		matchUtilities(
			{
				'text-fill'(getterOrValue) {
					const value =
						typeof getterOrValue === 'function'
							? getterOrValue({})
							: getterOrValue;
					return {
						'text-fill-color': value,
						'-webkit-text-fill-color': value,
					};
				},
			},
			{
				values: colors,
				type: ['color'],
			},
		);
	},
	{
		theme: {
			textStrokeWidth: ({ theme }: PluginAPI) => ({
				...theme('borderWidth'),
			}),
		},
	},
);
