import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from './providers'
import { AuthProvider } from '@/lib/auth-context'
import { TransactionProvider } from '@/lib/transaction-context'
import { SettingsProvider } from '@/lib/settings-context'
import { TransferProvider } from '@/lib/transfer-context'
import { TitleProvider } from '@/lib/title-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'PINNACLE VAULT USER LOGIN',
  description: 'Secure user authentication for Pinnacle Vault Trust banking platform',
  icons: {
    icon: '/pinnacle-logo.png',
    apple: '/pinnacle-logo.png',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Providers>
          <TitleProvider>
            <SettingsProvider>
              <AuthProvider>
                <TransactionProvider>
                  <TransferProvider>
                    {children}
                  </TransferProvider>
                </TransactionProvider>
              </AuthProvider>
            </SettingsProvider>
          </TitleProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
