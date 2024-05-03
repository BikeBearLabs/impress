import plugin from 'tailwindcss/plugin';

export const tailwindPluginRadialGradient = plugin(
	({ matchUtilities, theme }) => {
		matchUtilities(
			{
				'bg-gradient-radial': (value) => ({
					'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`,
				}),
			},
			{ values: theme('radialGradient')! },
		);
	},
	{
		theme: {
			radialGradient: {
				DEFAULT: 'circle',
				'at-center': 'circle at center',
				'at-tl': 'circle at top left',
				'at-tr': 'circle at top right',
				'at-bl': 'circle at bottom left',
				'at-br': 'circle at bottom right',
				'at-tc': 'circle at top center',
				'at-bc': 'circle at bottom center',
				'at-cl': 'circle at center left',
				'at-cr': 'circle at center right',
				ellipse: 'ellipse',
				'ellipse-at-center': 'ellipse at center',
				'ellipse-at-tl': 'ellipse at top left',
				'ellipse-at-tr': 'ellipse at top right',
				'ellipse-at-bl': 'ellipse at bottom left',
				'ellipse-at-br': 'ellipse at bottom right',
				'ellipse-at-tc': 'ellipse at top center',
				'ellipse-at-bc': 'ellipse at bottom center',
				'ellipse-at-cl': 'ellipse at center left',
				'ellipse-at-cr': 'ellipse at center right',
			},
		},
	},
);
