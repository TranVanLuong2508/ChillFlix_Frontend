import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
    title: 'Chillflix | Cùng xem phim Chill',
    description: 'Website Watching Films',
    generator: '',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
            <body >
                {children}
                <Analytics />
            </body>
        </html>
    )
}
