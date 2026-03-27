import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'GEO Audit — Analysez votre visibilité IA', description: 'Auditez la compatibilité IA de votre site web.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>
}
