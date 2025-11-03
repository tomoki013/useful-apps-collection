import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import * as Layouts from '@/app/components/layouts/index';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  	title: '便利アプリ集 - 日常を便利にするツール集',
  	description: '日常生活や仕事で使える便利なアプリケーションを集めました。計算機、タイマー、テキスト変換など、様々なツールをご利用いただけます。',
};

export default function RootLayout({
  	children,
}: {
  	children: React.ReactNode;
}) {
  	return (
  	  	<html lang="ja" suppressHydrationWarning>
  	  	  	<body className={inter.className}>
  	  	  	  	<ThemeProvider
  	  	  	  	  	attribute="class"
  	  	  	  	  	defaultTheme="system"
  	  	  	  	  	enableSystem
  	  	  	  	  	disableTransitionOnChange
  	  	  	  	>
  	  	  	  	  	<Layouts.Header />
  	  	  	  	  	<main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  	  	  	  	  	  	{children}
  	  	  	  	  	</main>
  	  	  	  	  	<Layouts.Footer />
  	  	  	  	</ThemeProvider>
  	  	  	</body>
  	  	</html>
  	);
}