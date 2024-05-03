declare module 'tailwindcss/lib/util/flattenColorPalette' {
	import { type KeyValuePair } from 'tailwindcss/types/config';
	import { type ColorValue } from 'tailwindcss/lib/util/types';
	export default function flattenColorPalette(
		colors: KeyValuePair<string, ColorValue>,
	): KeyValuePair<string, (o: { opacityValue?: number }) => string>;
}
