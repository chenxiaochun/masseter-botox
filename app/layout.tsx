// app/layout.tsx
import type { Metadata } from 'next'
import { Outfit, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans', weight: ['300', '400', '500', '600', '700'] })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700', '800'],
})
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? ''

export const metadata: Metadata = {
  title: {
    default: 'Botox Calculator – Units & Cost Estimator',
    template: '%s | BotoxCalc',
  },
  description: 'Free Botox unit and cost calculator. Estimate how many units you need and what it will cost for any treatment area.',
  metadataBase: new URL('https://seoer.vercel.app'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="font-sans min-h-screen bg-background">
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* ── Header ── */}
        <header className="bg-foreground sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group cursor-pointer">
              {/* Logo mark */}
              <span className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                  <path d="M10 3 C7 3 5 5.5 5 8 C5 11 7.5 13.5 10 17 C12.5 13.5 15 11 15 8 C15 5.5 13 3 10 3Z" fill="white" opacity="0.9"/>
                </svg>
              </span>
              <span className="font-heading font-bold text-background text-xl tracking-tight group-hover:opacity-80 transition-opacity">
                BotoxCalc
              </span>
            </a>

            <nav className="flex items-center gap-1 text-sm">
              <a href="/masseter" className="px-3.5 py-2 rounded-lg text-background/60 hover:text-background hover:bg-background/10 transition-all cursor-pointer">
                Masseter
              </a>
              <a href="/about" className="px-3.5 py-2 rounded-lg text-background/60 hover:text-background hover:bg-background/10 transition-all cursor-pointer">
                About
              </a>
            </nav>
          </div>
        </header>

        {children}

        {/* ── Footer ── */}
        <footer className="bg-foreground border-t border-background/10">
          <div className="max-w-5xl mx-auto px-5 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-primary flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 20 20" fill="none" className="w-3 h-3">
                    <path d="M10 3 C7 3 5 5.5 5 8 C5 11 7.5 13.5 10 17 C12.5 13.5 15 11 15 8 C15 5.5 13 3 10 3Z" fill="white" opacity="0.9"/>
                  </svg>
                </span>
                <span className="text-sm font-semibold text-background/80">BotoxCalc</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-background/50">
                <a href="/privacy" className="hover:text-background/80 transition-colors cursor-pointer">Privacy Policy</a>
                <a href="/about"   className="hover:text-background/80 transition-colors cursor-pointer">About</a>
                <span>For estimation only. Not medical advice.</span>
              </div>
              <span className="text-xs text-background/30">© {new Date().getFullYear()} BotoxCalc</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
