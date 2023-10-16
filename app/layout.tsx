import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Try shipt, our Same day Delivery apps GPT-IDE for mobile and web .',
  description: 'Shipt! Same day Delivery apps for mobile and web using Genrative UI and React Native for devs, hackathons and prototypes.'
}
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <script async src="https://snack.expo.dev/embed.js"></script>
      <Analytics />

    </html>
  )
}
