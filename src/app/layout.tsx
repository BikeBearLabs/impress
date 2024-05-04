import '@/theme/globals.css';
import { display, mono, sans } from '@/theme/typography';
import { type PropsWithChildren } from 'react';

export const metadata = {
	title: 'Site',
	description: 'Hello World',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
	return (
		<html lang='en'>
			<body
				className={`font-sans ${sans.variable} ${display.variable} ${mono.variable}`}
			>
				{children}
			</body>
		</html>
	);
}
