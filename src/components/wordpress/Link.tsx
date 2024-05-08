import { type Props } from '@/lib/types/Props';
import { getWordpressUrl } from '@/lib/wordpress/getWordpressUrl';

type LinkPropUrl = { url: string };
type LinkPropHref = { href: string };

export function Link(
	props: Props.WithClassName.WithChildren<
		(LinkPropHref | LinkPropUrl) &
			Omit<React.JSX.IntrinsicElements['a'], 'href'> & {}
	>,
) {
	const urlString: string | undefined = (props as LinkPropUrl).url;
	const hrefString: string | undefined = (props as LinkPropHref).href;
	const path =
		urlString == null
			? hrefString == null
				? undefined
				: getWordpressUrl(hrefString)
			: getWordpressUrl(urlString);

	return (
		<a
			{...props}
			href={path}
		>
			{props.children}
		</a>
	);
}
