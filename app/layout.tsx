import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import ToastProvider from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'fLEx - Focused Learning Experience',
  description: 'Created by Joseph Opio ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className='!scroll-smooth'>
        <body className={`${inter.className}`}>
          <ConfettiProvider />
          <ToastProvider />
          {/* <UserButton afterSignOutUrl="/" /> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
