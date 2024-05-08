import { type Props } from '@/lib/types/Props';
import clsx from 'clsx';
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from 'embla-carousel-react';
import {
	forwardRef,
	useEffect,
	type ReactNode,
	type ElementType,
	type HTMLAttributes,
} from 'react';

export type EmblaRef = UseEmblaCarouselType[0];
export type EmblaApi = UseEmblaCarouselType[1];
type CarouselProps = Props.WithClassName<
	NonNullable<Parameters<typeof useEmblaCarousel>[0]> & {
		scroller?: ElementType<HTMLAttributes<HTMLElement>>;
		ref?: EmblaRef;
		before?: ReactNode;
		children: ReactNode;
		after?: ReactNode;
		onCreate?: (api: EmblaApi) => void;
	}
>;
export const Carousel = forwardRef(function Carousel(
	props: CarouselProps,
	ref,
) {
	const {
		scroller: Scroller = (props) => <div {...props} />,
		before,
		children,
		after,
		onCreate,
		className,
		...options
	} = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	useEffect(() => {
		onCreate?.(emblaApi);
	}, [emblaApi, onCreate]);

	return (
		<div
			className={clsx('flex flex-col overflow-hidden', className)}
			ref={(v) => {
				emblaRef(v);
				if (ref)
					if (typeof ref === 'function') ref(v);
					else ref.current = v;
			}}
		>
			{before}
			<Scroller
				className='flex flex-grow items-stretch [&>*]:min-w-0 [&>*]:flex-shrink-0 [&>*]:flex-grow-0
					[&>*]:basis-full'
			>
				{children}
			</Scroller>
			{after}
		</div>
	);
});
