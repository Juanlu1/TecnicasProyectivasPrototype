import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Técnicas Proyectivas',
  description: 'Test de frases incompletas por bloques temáticos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
