// yanked from https://github.com/lleaff/tagged-template-noop/blob/master/index.js

export function tw(strings: TemplateStringsArray, ...values: any[]) {
	const lastIndex = strings.length - 1;

	return (
		strings
			.slice(0, lastIndex)
			.reduce((p, s, i) => p + s + String(values[i]), '') +
		strings[lastIndex]
	);
}
