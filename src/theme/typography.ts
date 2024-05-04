import { Space_Grotesk, Space_Mono } from 'next/font/google';

export const sans = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-sans',
});
export const display = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-display',
	weight: ['400', '700'],
});
export const mono = Space_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
	weight: ['400', '700'],
});
