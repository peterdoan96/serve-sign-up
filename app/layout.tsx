import type { Metadata } from 'next'
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const _geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const _display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600'] })

export const metadata: Metadata = { title: 'SERVE — Property operations, simplified', description: 'A calmer way to run your hospitality property.', generator: 'v0.app' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${_geist.variable} ${_geistMono.variable} ${_display.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
