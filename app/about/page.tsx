// app/about/page.tsx
import type { Metadata } from 'next'
import { ShieldCheck, BookOpen, Globe, TriangleAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'About BotoxCalc – a free tool for estimating Botox units and treatment costs.',
}

const ITEMS = [
  {
    icon: BookOpen,
    title: 'What We Do',
    body: 'BotoxCalc is a free online tool that helps you estimate the number of Botox units you may need and the approximate cost for common cosmetic treatments before your clinic visit.',
    accent: false,
  },
  {
    icon: Globe,
    title: 'How We Calculate',
    body: 'Our estimates are based on published clinical guidelines and typical provider pricing across the US, UK, Australia, and Canada. They are a starting point for conversations with your provider — not a final quote.',
    accent: false,
  },
  {
    icon: ShieldCheck,
    title: 'Your Privacy',
    body: 'All calculations run entirely in your browser. We do not store your inputs or results on any server.',
    accent: false,
  },
  {
    icon: TriangleAlert,
    title: 'Medical Disclaimer',
    body: 'BotoxCalc is for informational and estimation purposes only. Always consult a qualified medical professional before undergoing any cosmetic procedure. Actual units and costs vary significantly by provider, technique, and individual anatomy.',
    accent: true,
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-foreground border-b border-background/10">
        <div className="max-w-5xl mx-auto px-5 py-12 sm:py-16">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">About</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-background mb-3">
            About BotoxCalc
          </h1>
          <p className="text-background/60 text-base max-w-lg leading-relaxed">
            A free, evidence-based tool helping patients estimate Botox treatment
            costs before their consultation.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-5 py-10">
        <div className="grid sm:grid-cols-2 gap-5">
          {ITEMS.map(({ icon: Icon, title, body, accent }) => (
            <div
              key={title}
              className={`rounded-2xl p-6 ring-1 shadow-sm ${
                accent
                  ? 'bg-primary/8 ring-primary/25'
                  : 'bg-card ring-border hover:shadow-md hover:-translate-y-0.5 transition-all'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                accent ? 'bg-primary/15' : 'bg-primary/10'
              }`}>
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-heading text-lg font-bold mb-2 text-foreground">
                {title}
              </h2>
              <p className={`text-sm leading-relaxed ${accent ? 'text-foreground/70' : 'text-muted-foreground'}`}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
