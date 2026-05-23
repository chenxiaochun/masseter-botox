// app/masseter/page.tsx
import type { Metadata } from 'next'
import { Globe, ShieldCheck, Users, Clock, DollarSign, Syringe, FlaskConical, MapPin, Hand, Calculator as CalcIcon } from 'lucide-react'
import Calculator from '@/components/Calculator'
import FAQ from '@/components/FAQ'
import AdUnit from '@/components/AdUnit'
import { masseterArea } from '@/data/areas'

export const metadata: Metadata = {
  title: 'Masseter Botox Calculator – Units & Cost Estimator',
  description:
    'Calculate how many units of Botox you need for masseter jaw slimming or teeth grinding (bruxism). Get an instant cost estimate for the US, UK, Australia, and Canada.',
  alternates: { canonical: '/masseter' },
}

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Masseter Botox Calculator',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  description: 'Estimate Botox units and cost for masseter jaw slimming and bruxism treatment.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const faqs = [
  {
    question: 'How many units of Botox do I need for masseter jaw slimming?',
    answer: 'Most patients need 20–30 units per side (40–60 units total) for jaw slimming. First-time patients typically start with 15–25 units per side to assess muscle response.',
  },
  {
    question: 'How much does masseter Botox cost?',
    answer: 'Masseter Botox typically costs $400–$1,200 in the US, £320–£1,050 in the UK, and A$480–$1,320 in Australia, depending on the number of units used and the provider.',
  },
  {
    question: 'How long does masseter Botox last?',
    answer: 'Results for jaw slimming last 4–6 months. For bruxism (teeth grinding), effects typically last 3–4 months. Repeated treatments may extend duration over time.',
  },
  {
    question: 'How many units of Botox are needed for teeth grinding (bruxism)?',
    answer: 'Bruxism treatment typically requires 25–35 units per side (50–70 units total). The masseter muscles engaged in grinding are often stronger and need a higher dose.',
  },
  {
    question: 'Is masseter Botox the same as jaw slimming Botox?',
    answer: 'Yes. "Masseter Botox," "jaw Botox," and "jaw slimming Botox" all refer to injecting botulinum toxin into the masseter muscle. It reduces muscle bulk gradually over 4–6 weeks when used for facial slimming.',
  },
  {
    question: 'When will I see results from masseter Botox?',
    answer: 'Reduced jaw tension may be noticeable within 1–2 weeks. Visible slimming results develop over 4–6 weeks as the masseter muscle gradually reduces in size.',
  },
]

/* ── Trust bar data ── */
const TRUST_STATS = [
  { icon: Syringe,     value: '40–60',   label: 'Typical units',      sub: 'total both sides' },
  { icon: DollarSign,  value: '$400+',   label: 'Average cost (US)',   sub: 'starting price'   },
  { icon: Clock,       value: '4–6 mo',  label: 'Results last',        sub: 'jaw slimming'     },
  { icon: Globe,       value: '4',       label: 'Countries covered',   sub: 'US · UK · AU · CA'},
]

/* ── How it works ── */
const HOW_TO_STEPS = [
  { icon: FlaskConical, n: '01', title: 'Treatment Goal',  text: 'Choose jaw slimming or bruxism relief.' },
  { icon: MapPin,       n: '02', title: 'Your Country',    text: 'Select for accurate local pricing.' },
  { icon: Hand,         n: '03', title: 'First Treatment', text: 'Indicate if this is your first session.' },
  { icon: CalcIcon,     n: '04', title: 'Get Estimate',    text: 'Tap Calculate for your personalised result.' },
]

const GUIDE_LINKS = [
  {
    href: '/masseter/guide',
    title: 'Complete Guide',
    desc: 'What masseter botox is, how it works, and who it suits.',
  },
  {
    href: '/masseter/cost',
    title: 'Cost Guide',
    desc: 'Typical prices in the US, UK, Australia, and Canada.',
  },
  {
    href: '/masseter/units',
    title: 'Units & Dosage',
    desc: 'How many units you need for jaw slimming or bruxism.',
  },
  {
    href: '/masseter/before-after',
    title: 'Before & After',
    desc: 'Week-by-week results timeline from day 1 to month 3.',
  },
  {
    href: '/masseter/recovery',
    title: 'Recovery Guide',
    desc: 'Aftercare instructions and side effects to watch for.',
  },
  {
    href: '/masseter/bruxism',
    title: 'Bruxism Guide',
    desc: 'How botox treats teeth grinding — dosage and results.',
  },
]

export default function MasseterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      {/* ══════════════════════════════════════════
          HERO — two-column: copy left, calculator right
          ══════════════════════════════════════════ */}
      <section className="bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-5 pt-12 pb-14 lg:pt-16 lg:pb-18">
          <div className="lg:grid lg:grid-cols-2 lg:gap-14 lg:items-start">

            {/* LEFT — marketing copy */}
            <div className="mb-8 lg:mb-0 lg:pt-3">
              {/* Category chip */}
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 border border-primary/20 rounded-full px-3 py-1 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Masseter Botox · Free Estimator
              </span>

              <h1 className="font-heading text-foreground font-bold leading-[1.1] mb-4"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}>
                Know Exactly What<br />
                Your Botox Will Cost
              </h1>

              <p className="text-muted-foreground text-base leading-relaxed mb-7 max-w-sm">
                Instant, evidence-based estimates for masseter jaw slimming or
                bruxism treatment — personalised to your country.
              </p>

              {/* Mini trust badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { icon: ShieldCheck, text: 'Clinical guidelines' },
                  { icon: Globe,       text: '4 countries' },
                  { icon: Users,       text: 'No signup needed' },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary border border-border rounded-full px-3 py-1.5">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {text}
                  </span>
                ))}
              </div>

              {/* Mobile: ad before calculator */}
              <div className="lg:hidden mb-4">
                <AdUnit slot="top-banner" />
              </div>
            </div>

            {/* RIGHT — calculator (the "input-box hero") */}
            <div>
              <Calculator area={masseterArea} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PAGE CONTENT — max-width wrapper
          ══════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto">

        {/* ── Trust stats bar ── */}
        <section className="border-b border-border bg-card">
          <div className="px-5 py-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {TRUST_STATS.map(({ icon: Icon, value, label, sub }) => (
                <div key={label} className="flex items-center gap-3 py-1">
                  <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-heading text-base font-bold text-foreground leading-none">{value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 truncate">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main content ── */}
        <main className="px-5 py-10">

          {/* Desktop ad */}
          <AdUnit slot="top-banner" className="hidden lg:block mb-8" />

          {/* How it works */}
          <section className="mt-6">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                How it works
              </h2>
              <p className="text-sm text-muted-foreground">
                Four simple steps to your personalised estimate.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HOW_TO_STEPS.map(({ icon: Icon, n, title, text }) => (
                <div key={n} className="bg-card rounded-2xl p-5 ring-1 ring-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-heading text-3xl font-bold text-border leading-none">{n}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <AdUnit slot="mid-content" className="my-10" />

          {/* FAQ */}
          <section>
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-muted-foreground">
                Common questions about masseter Botox dosing and pricing.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <FAQ items={faqs} />
            </div>
          </section>

          {/* Learn More */}
          <section className="mt-10">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                Learn More About Masseter Botox
              </h2>
              <p className="text-sm text-muted-foreground">
                In-depth guides to help you make an informed decision.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {GUIDE_LINKS.map(({ href, title, desc }) => (
                <a
                  key={href}
                  href={href}
                  className="bg-card rounded-2xl p-4 ring-1 ring-border hover:ring-primary/40 hover:-translate-y-0.5 hover:shadow-md transition-all group"
                >
                  <p className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <div className="mt-10 flex items-start gap-3 bg-primary/8 border border-primary/20 rounded-2xl px-5 py-4">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/70 leading-relaxed">
              <strong>Medical Disclaimer:</strong> BotoxCalc provides estimates based on published clinical
              guidelines. Actual units and costs vary by provider, anatomy, and technique. Always consult
              a qualified medical professional before any cosmetic procedure.
            </p>
          </div>
        </main>

      </div>
    </>
  )
}
