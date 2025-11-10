import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { I18nProviderClient } from '@/i18n/client';
import MainLayout from '@/app/components/layouts/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '便利アプリ集 - 日常を便利にするツール集',
	description: '日常生活や仕事で使える便利なアプリケーションを集めました。計算機、タイマー、テキスト変換など、様々なツールをご利用いただけます。',
};

export default function RootLayout({
	children,
    params: { lang },
}: {
	children: React.ReactNode;
    params: { lang: string };
}) {
	return (
		<html lang={lang} suppressHydrationWarning>
			<body className={inter.className}>
				<I18nProviderClient locale={lang}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<MainLayout>{children}</MainLayout>
					</ThemeProvider>
				</I18nProviderClient>
			</body>
		</html>
	);
}