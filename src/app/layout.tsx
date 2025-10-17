// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Shop',
  description: 'Digital card store powered by Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
