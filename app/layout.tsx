import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Form Prototype',
  description: 'Next.js form prototype for user research',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
