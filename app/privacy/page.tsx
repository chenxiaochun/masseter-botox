// app/privacy/page.tsx
import type { Metadata } from 'next'
import { ShieldCheck, BarChart2, Megaphone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: 'Data We Collect',
    body: 'BotoxCalc does not collect any personal information. All calculations run locally in your browser. We do not store your inputs or results on any server.',
  },
  {
    icon: Megaphone,
    title: 'Advertising',
    body: null,
    adBody: true,
  },
  {
    icon: BarChart2,
    title: 'Analytics',
    body: 'We may use Google Analytics to understand aggregate, anonymous site usage. No personally identifiable data is collected or shared.',
  },
  {
    icon: Mail,
    title: 'Contact',
    body: null,
    contactBody: true,
  },
]

export default function PrivacyPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-foreground border-b border-background/10">
        <div className="max-w-5xl mx-auto px-5 py-12 sm:py-16">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-background mb-3">
            Privacy Policy
          </h1>
          <p className="text-background/50 text-sm">Last updated: 2026-05-22</p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-5 py-10">
        <div className="grid sm:grid-cols-2 gap-5">
          {SECTIONS.map(({ icon: Icon, title, body, adBody, contactBody }) => (
            <div key={title} className="bg-card rounded-2xl p-6 ring-1 ring-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-2">{title}</h2>

              {body && (
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              )}

              {adBody && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use Google AdSense to display ads. Google may use cookies to serve ads based on
                  your browsing history. You can opt out at{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Ads Settings
                  </a>
                  .
                </p>
              )}

              {contactBody && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For privacy questions, please use the contact information on the{' '}
                  <a href="/about" className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">
                    About page
                  </a>
                  .
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
