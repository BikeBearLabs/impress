/* eslint-disable max-nested-callbacks */
/* eslint-disable @typescript-eslint/naming-convention */
import plugin from 'tailwindcss/plugin';
import type { CustomThemeConfig } from 'tailwindcss/types/config';

const heightConfig = {
	dvh: ['100vh', '100dvh'],
	lvh: ['100vh', '100lvh'],
	svh: ['100vh', '100svh'],
} as const;
const widthConfig = {
	dvw: ['100vw', '100dvw'],
	lvw: ['100vw', '100lvw'],
	svw: ['100vw', '100svw'],
} as const;

type CustomThemeConfigWithArrayValues<
	C extends CustomThemeConfig = CustomThemeConfig,
> = {
	[k in keyof C]: C[k] extends string
		? C[k] | C[k][]
		: CustomThemeConfigWithArrayValues<C[k]>;
};
type Entries<T extends {}> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];
type FromEntries<T extends readonly (readonly [PropertyKey, unknown])[]> = {
	[K in T[number][0]]: Extract<T[number], [K, unknown]>[1];
};

const getUnitful = (value: string, targetUnit: string, sourceUnit: string) =>
	value.replace(
		new RegExp(`((\\d+)%|${sourceUnit})|(^\\d+$)`, 'g'),
		`$2$3${targetUnit}`,
	);

export const tailwindPluginViewportUnit = plugin(
	({ matchUtilities, addUtilities }) => {
		const axisKeyModifierToCssPropModifiers = {
			x: ['left', 'right'],
			y: ['top', 'bottom'],
			t: ['top'],
			b: ['bottom'],
			l: ['left'],
			r: ['right'],
			e: ['inline-end'],
			s: ['inline-start'],
		} as const;
		const axisKeyModifierAndCssPropModifiers = Object.entries(
			axisKeyModifierToCssPropModifiers,
		) as Entries<typeof axisKeyModifierToCssPropModifiers>;
		const axisKeyPrefixToCssValuePrefix = {
			'': '',
			'-': '-',
		};
		const axisKeyPrefixAndCssValuePrefix = Object.entries(
			axisKeyPrefixToCssValuePrefix,
		) as Entries<typeof axisKeyPrefixToCssValuePrefix>;
		const getAxisWithModifiers = <A extends string, P extends string>(
			axis: A,
			prop: P,
		) =>
			Object.fromEntries(
				axisKeyModifierAndCssPropModifiers.map(
					([modifier, modifierProp]) =>
						[
							`${axis}${modifier}`,
							modifierProp.map((p) => `${prop}-${p}` as const),
						] as const,
				),
			);
		const axisKeyToCssProp = {
			h: ['height'],
			w: ['width'],
			'min-h': ['min-height'],
			'min-w': ['min-width'],
			'max-h': ['max-height'],
			'max-w': ['max-width'],
			left: ['left'],
			top: ['top'],
			right: ['right'],
			bottom: ['bottom'],
			gap: ['gap'],
			'gap-x': ['column-gap'],
			'gap-y': ['row-gap'],
			'grid-cols': ['grid-template-columns'],
			'grid-rows': ['grid-template-rows'],
			text: ['font-size'],
			m: ['margin'],
			...getAxisWithModifiers('m', 'margin'),
			p: ['padding'],
			...getAxisWithModifiers('p', 'padding'),
		} as const;
		const axisKeyAndCssProp = Object.entries(axisKeyToCssProp);
		const units = ['vh', 'vw', 'vmin', 'vmax'];
		const unitModifiers = ['d', 'l', 's'];
		const utilityEntries = units
			.map((unitBase) =>
				unitModifiers
					.map((modifier) => `${modifier}${unitBase}`)
					.map((unitModified) =>
						axisKeyAndCssProp
							.map(([axisKey, cssProps]) =>
								axisKeyPrefixAndCssValuePrefix.map(
									([axisKeyPrefix, cssValuePrefix]) =>
										[
											`${axisKeyPrefix}${axisKey}-${unitModified}`,
											(v: string) =>
												Object.fromEntries(
													cssProps.map((cssProp) => [
														cssProp,
														[
															`${cssValuePrefix}${getUnitful(v, unitBase, unitModified)}`,
															`${cssValuePrefix}${getUnitful(v, unitModified, unitBase)}`,
														],
													]),
												),
										] as const,
								),
							)
							.flat(),
					),
			)
			.flat(2);
		addUtilities(
			Object.fromEntries(
				utilityEntries.map(([k, v]) => [k, v('100%')]),
			) as FromEntries<typeof utilityEntries>,
		);
		matchUtilities(Object.fromEntries(utilityEntries), {
			values: {
				'1/2': '50%',
				'1/3': '33.333333%',
				'2/3': '66.666667%',
				'1/4': '25%',
				'2/4': '50%',
				'3/4': '75%',
				'1/5': '20%',
				'2/5': '40%',
				'3/5': '60%',
				'4/5': '80%',
				'1/6': '16.666667%',
				'2/6': '33.333333%',
				'3/6': '50%',
				'4/6': '66.666667%',
				'5/6': '83.333333%',
				'1/12': '8.333333%',
				'2/12': '16.666667%',
				'3/12': '25%',
				'4/12': '33.333333%',
				'5/12': '41.666667%',
				'6/12': '50%',
				'7/12': '58.333333%',
				'8/12': '66.666667%',
				'9/12': '75%',
				'10/12': '83.333333%',
				'11/12': '91.666667%',
			},
		});
	},
	{
		theme: {
			extend: {
				height: heightConfig,
				width: widthConfig,
				minHeight: heightConfig,
				minWidth: widthConfig,
				spacing: {
					...heightConfig,
					...widthConfig,
				},
			} as Partial<CustomThemeConfigWithArrayValues> as {},
		},
	},
);
