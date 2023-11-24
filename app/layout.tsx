import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ToastProvider from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://lms.josephopio.com'),
  title: {
    template: '%s | Focused Learning Experience',
    default: 'fLEx | Focused Learning Experience',
  },
  keywords: ["fLEx", "focused learning experience", "online courses", "elearning", "online school", "free courses", "joseph", "opio", "computer", "science", "teacher", "gems", "xcl", "igcse", "cambridge", "programming", "malaysia", "bxcl", "ugandan teacher", "ugandan in malaysia"],
  description: 'Here, you will find courses curated for you. Some are free and some are paid. You can get in touch with me so that you also create your own courses and share them with others. You will then be able to earn from this site.',
  robots: 'index, follow',
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
    }
  },
  // TODO: Thi sis where i need to start editing

  openGraph: {
    url: '/',
    title: {
      template: '%s | Focused Learning Experience',
      default: 'fLEx | Focused Learning Experience',
    },
    description: 'Here, you will find courses curated for you. Some are free and some are paid. You can get in touch with me so that you also create your own courses and share them with others. You will then be able to earn from this site.',
    images: [
      {
        url: '/fLEx.svg',
        width: 800,
        height: 800,
        alt: 'fLEx - Focused Learning Experieince',
      },
    ],
    locale: 'en_US',
    type: 'website',
    siteName: 'fLEx - Focused Learning Experieince',
  },
  twitter: {
    card: "summary_large_image",
    site: "@site",
    creator: "@creator",
    images: "/fLEx.svg",
    description: 'Here, you will find courses curated for you. Some are free and some are paid. You can get in touch with me so that you also create your own courses and share them with others. You will then be able to earn from this site.'
  }
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
