import type { Config } from 'tailwindcss';
import { tailwindPluginGridAutoFit } from './tools/tailwind/plugins/tailwindPluginGridAutoFit';
import { tailwindPluginRadialGradient } from './tools/tailwind/plugins/tailwindPluginRadialGradient';
import { tailwindPluginSpacingDyn } from './tools/tailwind/plugins/tailwindPluginSpacingDyn';
import { tailwindPluginViewportUnit } from './tools/tailwind/plugins/tailwindPluginViewportUnit';
import { tailwindPluginTextStroke } from './tools/tailwind/plugins/tailwindPluginTextStroke';
import { tailwindPluginOutset } from './tools/tailwind/plugins/tailwindPluginOutset';

export default {
	darkMode: ['class'],
	content: ['./src/**/*.{html,?(m|c)?(j|t)s?(x)}'],
	safelist: ['dark'],
	plugins: [
		tailwindPluginGridAutoFit,
		tailwindPluginRadialGradient,
		tailwindPluginSpacingDyn,
		tailwindPluginViewportUnit,
		tailwindPluginTextStroke,
		tailwindPluginOutset,
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				'bg-1': 'hsl(var(--bg-1) / <alpha-value>)',
				'bg-2': 'hsl(var(--bg-2) / <alpha-value>)',
				'bg-3': 'hsl(var(--bg-3) / <alpha-value>)',
				'fg-1': 'hsl(var(--fg-1) / <alpha-value>)',
				'fg-2': 'hsl(var(--fg-2) / <alpha-value>)',
				'fg-3': 'hsl(var(--fg-3) / <alpha-value>)',
				'accent-1': 'hsl(var(--accent-1) / <alpha-value>)',
				'accent-2': 'hsl(var(--accent-2) / <alpha-value>)',
				'accent-3': 'hsl(var(--accent-3) / <alpha-value>)',
				overlay: 'hsl(var(--overlay) / <alpha-value>)',
			},
			borderRadius: {
				'4xl': 'calc(var(--radius) * 8)',
				'3xl': 'calc(var(--radius) * 6)',
				'2xl': 'calc(var(--radius) * 4)',
				xl: 'calc(var(--radius) * 2)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				display: 'var(--font-display)',
				sans: 'var(--font-sans)',
				mono: 'var(--font-mono)',
			},
			fontWeight: {
				thin: '100',
				extralight: '200',
				light: '300',
				book: '350',
				regular: '400',
				medium: '500',
				bold: '700',
				heavy: '800',
				black: '900',
				super: '1000',
			},
			transitionTimingFunction: {
				'in-sine': 'cubic-bezier(0.12, 0, 0.39, 0)',
				'out-sine': 'cubic-bezier(0.61, 1, 0.88, 1)',
				'in-out-sine': 'cubic-bezier(0.37, 0, 0.63, 1)',

				'in-quad': 'cubic-bezier(0.11, 0, 0.5, 0)',
				'out-quad': 'cubic-bezier(0.5, 1, 0.89, 1)',
				'in-out-quad': 'cubic-bezier(0.45, 0, 0.55, 1)',

				'in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)',
				'out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
				'in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)',

				'in-quart': 'cubic-bezier(0.5, 0, 0.75, 0)',
				'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
				'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',

				'in-quint': 'cubic-bezier(0.64, 0, 0.78, 0)',
				'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
				'in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',

				'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
				'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
				'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',

				'in-circ': 'cubic-bezier(0.55, 0, 1, 0.45)',
				'out-circ': 'cubic-bezier(0, 0.55, 0.45, 1)',
				'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',

				'in-back': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
				'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				'in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

				in: 'cubic-bezier(0.64, 0, 0.78, 0)',
				out: 'cubic-bezier(0.22, 1, 0.36, 1)',
				'in-out': 'cubic-bezier(0.83, 0, 0.17, 1)',
			},
		},
	},
} as const satisfies Config;
