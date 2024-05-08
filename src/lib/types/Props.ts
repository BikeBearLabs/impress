/* eslint-disable @typescript-eslint/no-namespace */
import { type ElementType, type ReactNode, type Ref } from 'react';

type ChildrenProp = {
	children?: ReactNode;
};

type AsProp = {
	as?: ElementType;
};

type ClassNameProp = {
	className?: string;
};

export type Props<T> = T;
export namespace Props {
	export type WithChildren<T> = Props<T> & ChildrenProp;
	export namespace WithChildren {
		export type WithClassName<T> = WithChildren<T> & ClassNameProp;
		export namespace WithClassName {
			export type WithAs<T> = WithClassName<T> & AsProp;
		}
		export type WithAs<T> = WithChildren<T> & AsProp;
		export namespace WithAs {
			export type WithClassName<T> = WithAs<T> & ClassNameProp;
		}
	}

	export type WithClassName<T> = Props<T> & ClassNameProp;
	export namespace WithClassName {
		export type WithChildren<T> = WithClassName<T> & ChildrenProp;
		export namespace WithChildren {
			export type WithAs<T> = WithChildren<T> & AsProp;
		}
		export type WithAs<T> = WithClassName<T> & AsProp;
		export namespace WithAs {
			export type WithChildren<T> = WithAs<T> & ChildrenProp;
		}
	}

	export type WithAs<T> = Props<T> & AsProp;
	export namespace WithAs {
		export type WithChildren<T> = WithAs<T> & ChildrenProp;
		export namespace WithChildren {
			export type WithClassName<T> = WithChildren<T> & ClassNameProp;
		}
		export type WithClassName<T> = WithAs<T> & ClassNameProp;
		export namespace WithClassName {
			export type WithChildren<T> = WithClassName<T> & ChildrenProp;
		}
	}
}
