import { env } from '@/env';
import { type Props } from '@/lib/types/Props';
import { getWordpressUrl } from '@/lib/wordpress/getWordpressUrl';
import clsx from 'clsx';
import { useMemo } from 'react';

type ImagePropsWordpress = {
	url: string;
	alt: string;
	width?: number;
	height?: number;
	sizes?: Record<string, string> &
		Record<`${string}-${'width' | 'height'}`, number>;
};
type ImagePropsVanilla = {
	src: string;
	alt: string;
	sizes?: string;
};

export function Image(
	props: Props.WithClassName<ImagePropsWordpress | ImagePropsVanilla>,
) {
	const { className, alt } = props;
	const src = 'src' in props ? props.src : props.url;
	const intrinsicWidth = 'width' in props ? props.width : NaN;
	const intrinsicHeight = 'height' in props ? props.height : NaN;
	const hasIntrinsicSize = intrinsicWidth && intrinsicHeight;
	const sizesObject =
		'sizes' in props && typeof props.sizes === 'object'
			? props.sizes
			: undefined;
	const sizesString =
		'sizes' in props && typeof props.sizes === 'string'
			? props.sizes
			: undefined;
	const picture = useMemo(() => {
		if (!sizesObject)
			return (
				<img
					src={getWordpressUrl(src)}
					className={className}
					alt={alt}
					sizes={sizesString}
					{...(env.NEXT_PUBLIC_WORDPRESS_COMPONENTS_USE_RELATIVE_URL ===
						'0' && {
						crossOrigin: 'anonymous',
					})}
				/>
			);

		const entries = Object.entries(sizesObject);
		const variantEntries = entries.filter(
			([_, value]) => typeof value === 'string',
		) as [k: string, v: string][];

		return (
			<picture
				className={clsx(
					hasIntrinsicSize && 'aspect-[--intrinsic-aspect]',
					className,
				)}
				style={{
					...(hasIntrinsicSize && {
						'--intrinsic-aspect': `${intrinsicWidth}/${intrinsicHeight}`,
					}),
				}}
			>
				{...variantEntries.map(([variant, url], i) => (
					<source
						key={i}
						media={`(max-width: ${sizesObject[`${variant}-width`]}px) and (max-height: ${sizesObject[`${variant}-height`]}px)`}
						srcSet={getWordpressUrl(url)}
					/>
				))}
				<img
					src={getWordpressUrl(src)}
					alt={alt}
					{...(env.NEXT_PUBLIC_WORDPRESS_COMPONENTS_USE_RELATIVE_URL ===
						'0' && {
						crossOrigin: 'anonymous',
					})}
				/>
			</picture>
		);
	}, [
		src,
		alt,
		className,
		sizesString,
		sizesObject,
		intrinsicWidth,
		intrinsicHeight,
		hasIntrinsicSize,
	]);

	return picture;
}
