import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider, UserButton } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Computia - LMS',
  description: 'Created by Joseph Opio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* <UserButton afterSignOutUrl="/" /> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
