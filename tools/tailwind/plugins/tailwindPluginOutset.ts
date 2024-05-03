import plugin from 'tailwindcss/plugin';
import { type PluginAPI } from 'tailwindcss/types/config';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

type GeneratorValue<T extends (...args: any) => Generator<any, any, any>> =
	ReturnType<T> extends Generator<infer U, any, any> ? U : never;

const getCalcForFactor = (factor: -1 | 0 | 1, value: string) =>
	factor === -1 ? `calc(${factor} * ${value})` : factor === 0 ? '0' : value;

const createOctPartsIter = function* (width: string, color: string) {
	for (let fx = -1; fx <= 1; fx++) {
		for (let fy: -1 | 0 | 1 = -1; fy <= 1; fy++) {
			yield {
				x: getCalcForFactor(fx as -1 | 0 | 1, width),
				y: getCalcForFactor(fy as -1 | 0 | 1, width),
				color,
			};
		}
	}
};

const getOctPartValue = ({
	x,
	y,
	color,
}: GeneratorValue<typeof createOctPartsIter>) => `${x} ${y} 0 ${color}`;

const getSpreadValue = (width: string, color: string) =>
	`0 0 0 ${width} ${color}`;

const getColorValue = (
	getterOrValue: string | ReturnType<typeof flattenColorPalette>[string],
) => (typeof getterOrValue === 'function' ? getterOrValue({}) : getterOrValue);

const getVarValue = (varName: string) => `var(${varName})`;

const TEXT_SHADOW_WIDTH_VAR_NAME = `--outset-text-shadow-width`;
const TEXT_SHADOW_COLOR_VAR_NAME = `--outset-text-shadow-color`;
const TEXT_SHADOW_VALUE = [
	...createOctPartsIter(
		getVarValue(TEXT_SHADOW_WIDTH_VAR_NAME),
		getVarValue(TEXT_SHADOW_COLOR_VAR_NAME),
	),
]
	.map(getOctPartValue)
	.join(', ');

const DROP_SHADOW_WIDTH_VAR_NAME = `--outset-drop-shadow-width`;
const DROP_SHADOW_COLOR_VAR_NAME = `--outset-drop-shadow-color`;
const DROP_SHADOW_VALUE = [
	...createOctPartsIter(
		getVarValue(DROP_SHADOW_WIDTH_VAR_NAME),
		getVarValue(DROP_SHADOW_COLOR_VAR_NAME),
	),
]
	.map(getOctPartValue)
	.map(
		(value) =>
			`drop-shadow(${value}) var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)`,
	)
	.join(', ');

const BOX_SHADOW_WIDTH_VAR = `--outset-box-shadow-width`;
const BOX_SHADOW_COLOR_VAR = `--outset-box-shadow-color`;
const BOX_SHADOW_VALUE = getSpreadValue(
	getVarValue(BOX_SHADOW_WIDTH_VAR),
	getVarValue(BOX_SHADOW_COLOR_VAR),
);

export const tailwindPluginOutset = plugin(
	({ matchUtilities, theme }) => {
		const colors = flattenColorPalette(theme('colors'));
		for (const [name, prop, propValue, widthVar, colorVar] of [
			[
				'text',
				'text-shadow',
				TEXT_SHADOW_VALUE,
				TEXT_SHADOW_WIDTH_VAR_NAME,
				TEXT_SHADOW_COLOR_VAR_NAME,
			],
			[
				'drop',
				'filter',
				DROP_SHADOW_VALUE,
				DROP_SHADOW_WIDTH_VAR_NAME,
				DROP_SHADOW_COLOR_VAR_NAME,
			],
			[
				'box', //
				'box-shadow',
				BOX_SHADOW_VALUE,
				BOX_SHADOW_WIDTH_VAR,
				BOX_SHADOW_COLOR_VAR,
			],
		] as const) {
			matchUtilities(
				{
					[`${name}-outset`]: (value: string) => ({
						[widthVar]: value,
						[colorVar]: `theme(colors.foreground)`,
						[prop]: propValue,
					}),
				},
				{
					values: theme('outsetWidth'),
				},
			);
			matchUtilities(
				{
					[`${name}-outset`](color) {
						const value = getColorValue(color);
						return {
							[colorVar]: value,
							[prop]: propValue,
						};
					},
				},
				{
					values: colors,
					type: ['color'],
				},
			);
		}
	},
	{
		theme: {
			outsetWidth: ({ theme }: PluginAPI) => ({
				...theme('borderWidth'),
			}),
		},
	},
);
