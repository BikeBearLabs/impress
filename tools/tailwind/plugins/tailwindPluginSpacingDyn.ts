import plugin from 'tailwindcss/plugin';

export const tailwindPluginSpacingDyn = plugin(
	({ addBase }) => {
		addBase({
			':root': {
				'--spacing-dyn': 'theme(padding.14)',
				'@media not all and (min-width: theme(screens.sm))': {
					'--spacing-dyn': 'theme(padding.7)',
				},
			},
		});
	},
	{
		theme: {
			extend: {
				spacing: {
					dyn: 'var(--spacing-dyn)',
					'dyn-1/2': 'calc(var(--spacing-dyn) / 2)',
					'dyn-1/3': 'calc(var(--spacing-dyn) / 3)',
					'dyn-2/3': 'calc(var(--spacing-dyn) * 2 / 3)',
					'dyn-1/4': 'calc(var(--spacing-dyn) / 4)',
					'dyn-3/4': 'calc(var(--spacing-dyn) * 3 / 4)',
					'dyn-1/5': 'calc(var(--spacing-dyn) / 5)',
					'dyn-2/5': 'calc(var(--spacing-dyn) * 2 / 5)',
					'dyn-3/5': 'calc(var(--spacing-dyn) * 3 / 5)',
					'dyn-4/5': 'calc(var(--spacing-dyn) * 4 / 5)',
					'dyn-1/6': 'calc(var(--spacing-dyn) / 6)',
					'dyn-5/6': 'calc(var(--spacing-dyn) * 5 / 6)',
					'dyn-1/12': 'calc(var(--spacing-dyn) / 12)',
					'dyn-5/12': 'calc(var(--spacing-dyn) * 5 / 12)',
					'dyn-7/12': 'calc(var(--spacing-dyn) * 7 / 12)',
					'dyn-11/12': 'calc(var(--spacing-dyn) * 11 / 12)',
				},
			},
		},
	},
);
