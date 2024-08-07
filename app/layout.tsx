import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from 'src/lib/utils/cn';

import AppProvider from './AppProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn('flex overflow-hidden h-screen', inter.className)} suppressHydrationWarning={true}>
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}
