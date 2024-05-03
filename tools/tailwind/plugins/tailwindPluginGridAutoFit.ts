import plugin from 'tailwindcss/plugin';
import { type PluginAPI } from 'tailwindcss/types/config';

export const tailwindPluginGridAutoFit = plugin(
	({ matchUtilities, theme }) => {
		matchUtilities(
			{
				'grid-cols-auto-fit': (v) => ({
					gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${String(v)}), 1fr))`,
				}),
				'grid-rows-auto-fit': (v) => ({
					gridTemplateRows: `repeat(auto-fit, minmax(min(100%, ${String(v)}), 1fr))`,
				}),
			},
			{
				values: theme('gridAutoFit')!,
			},
		);
	},
	{
		theme: {
			gridAutoFit: ({ theme }: PluginAPI) => theme('maxWidth'),
		},
	},
);
