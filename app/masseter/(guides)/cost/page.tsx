import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import FAQ from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Masseter Botox Cost: US, UK, Australia & Canada (2025) | BotoxCalc',
  description:
    'Typical masseter botox prices in 2025: US $480–$1,200, UK £320–£900, Australia A$480–A$1,320, Canada CA$400–CA$1,080. Learn what affects the price.',
  alternates: { canonical: '/masseter/cost' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Masseter Botox Cost: Full Price Guide for US, UK, Australia & Canada (2025)',
  description: 'Typical prices for masseter botox by country, including per-unit rates and total treatment costs.',
  author: { '@type': 'Organization', name: 'BotoxCalc' },
  datePublished: '2026-05-23',
}

const PRICES = [
  { country: 'United States', perUnit: '$12–$20', total: '$480–$1,200', avg: '$700–$900' },
  { country: 'United Kingdom', perUnit: '£8–£15', total: '£320–£900', avg: '£500–£650' },
  { country: 'Australia', perUnit: 'A$12–A$22', total: 'A$480–A$1,320', avg: 'A$700–A$900' },
  { country: 'Canada', perUnit: 'CA$10–CA$18', total: 'CA$400–CA$1,080', avg: 'CA$600–CA$800' },
]

const faqs = [
  {
    question: 'How much does masseter botox cost per unit?',
    answer:
      'Typically $12–$20 per unit in the US, £8–£15 in the UK, and A$12–A$22 in Australia.',
  },
  {
    question: 'Is the cost different for bruxism vs. jaw slimming?',
    answer:
      'Yes. Bruxism typically requires higher doses (25–35 units per side vs. 20–30 for slimming), so total cost is slightly higher.',
  },
  {
    question: 'How often do I need to pay for masseter botox?',
    answer:
      'Every 4–6 months for jaw slimming; every 3–4 months for bruxism. Many patients find that after 2–3 treatments the dose needed decreases.',
  },
  {
    question: 'Are there cheaper alternatives to Botox brand?',
    answer:
      'Dysport and Xeomin are alternative brands of botulinum toxin and may be priced lower. Ask your provider if these are appropriate for your case.',
  },
  {
    question: 'Does masseter botox cost more the first time?',
    answer:
      'Not necessarily, but some clinics offer a lower starting dose for first-time patients to assess your response—which may cost slightly less.',
  },
]

export default function CostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="max-w-3xl mx-auto px-5 py-10">
        <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
          Pricing Guide
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Masseter Botox Cost: What to Expect in 2025
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          The cost of masseter botox varies significantly depending on where you live, the clinic
          you choose, and how many units you need. This guide breaks down typical prices in the US,
          UK, Australia, and Canada so you can walk into your consultation informed.
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            What Affects the Price?
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm leading-relaxed">
            <li><strong className="text-foreground">Number of units:</strong> More units = higher cost. Larger jaw muscles require more botox.</li>
            <li><strong className="text-foreground">Pricing model:</strong> Some clinics charge per unit; others charge a flat fee per treatment.</li>
            <li><strong className="text-foreground">Provider credentials:</strong> A board-certified plastic surgeon charges more than a nurse injector, but may offer higher precision.</li>
            <li><strong className="text-foreground">Geographic location:</strong> City centres cost more than regional areas.</li>
            <li><strong className="text-foreground">Brand:</strong> Botox (Allergan) typically costs more than Dysport or Xeomin.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            Price by Country (2025 Estimates)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-secondary text-left">
                  <th className="px-4 py-3 font-semibold text-foreground rounded-tl-xl">Country</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Per Unit</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Full Treatment</th>
                  <th className="px-4 py-3 font-semibold text-foreground rounded-tr-xl">Average</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map(({ country, perUnit, total, avg }, i) => (
                  <tr key={country} className={i % 2 === 0 ? 'bg-background' : 'bg-card'}>
                    <td className="px-4 py-3 font-medium text-foreground">{country}</td>
                    <td className="px-4 py-3 text-muted-foreground">{perUnit}</td>
                    <td className="px-4 py-3 text-muted-foreground">{total}</td>
                    <td className="px-4 py-3 text-primary font-medium">{avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Based on 40–60 units total (standard jaw slimming dose). Prices are estimates only.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            Per Unit vs. Flat-Fee Pricing
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Clinics use two models:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm leading-relaxed">
            <li><strong className="text-foreground">Per unit:</strong> You pay for exactly how many units are used. Better if you need a conservative first-time dose.</li>
            <li><strong className="text-foreground">Flat fee:</strong> Fixed price regardless of units. Better if you have large muscles that need higher doses.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3 text-sm">
            Ask your clinic which model they use before booking.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            Why Cheap Providers Are Risky
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Prices well below the typical range often signal diluted or counterfeit botulinum
            toxin, undertrained injectors, or unsanitary conditions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The masseter muscle sits close to muscles controlling your smile and bite. Incorrect
            injection technique can cause asymmetry or temporary difficulty chewing. Always verify
            your provider's credentials and ask to see before-and-after photos.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            Is Masseter Botox Covered by Insurance?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            <strong className="text-foreground">For cosmetic jaw slimming:</strong> No. Cosmetic
            procedures are never covered by insurance.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">For bruxism treatment:</strong> Occasionally. Some
            insurers in the US and Australia cover botulinum toxin for medically diagnosed bruxism
            (TMJ disorder). You will need a referral from a dentist or GP and a formal diagnosis.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <FAQ items={faqs} />
        </section>

        <div className="flex items-start gap-3 bg-primary/8 border border-primary/20 rounded-2xl px-5 py-4">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-foreground/70 leading-relaxed">
            <strong>Medical Disclaimer:</strong> Price estimates are for informational purposes
            only. Always consult a qualified medical professional for accurate cost information.
          </p>
        </div>
      </main>
    </>
  )
}
