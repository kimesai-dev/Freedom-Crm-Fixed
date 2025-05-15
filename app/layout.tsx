import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Freedom',
  description: 'AI-powered real estate CRM built from scratch.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
