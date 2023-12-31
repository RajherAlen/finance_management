import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from 'src/lib/utils/cn'

import 'react-toastify/dist/ReactToastify.css';
import AppProvider from './AppProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
})
{
    return (
        <html lang="en">
            <body className={cn(
                'flex overflow-hidden',
                inter.className
            )}>
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    )
}
