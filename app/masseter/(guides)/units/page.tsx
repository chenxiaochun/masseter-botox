import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import FAQ from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'How Many Units of Botox for Masseter? (2025 Dosage Guide) | BotoxCalc',
  description:
    'Masseter botox dosage: 20–30 units per side for jaw slimming, 25–35 for bruxism. Learn how jaw size, gender, and first-time vs. maintenance affect your dose.',
  alternates: { canonical: '/masseter/units' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Many Units of Botox Do You Need for Masseter Treatment?',
  description: 'A guide to masseter botox dosage ranges for jaw slimming and bruxism, and the factors that affect how many units you personally need.',
  author: { '@type': 'Organization', name: 'BotoxCalc' },
  datePublished: '2026-05-23',
}

const DOSAGE_ROWS = [
  { label: 'Jaw slimming – standard', perSide: '20–30 units', total: '40–60 units' },
  { label: 'Jaw slimming – first-time', perSide: '15–25 units', total: '30–50 units' },
  { label: 'Bruxism – standard', perSide: '25–35 units', total: '50–70 units' },
  { label: 'Bruxism – severe grinding', perSide: '30–40 units', total: '60–80 units' },
]

const faqs = [
  {
    question: 'How many units of Botox for jaw slimming?',
    answer:
      'Typically 40–60 units total (20–30 per side). First-time patients usually start at the lower end of the range to assess muscle response.',
  },
  {
    question: 'How many units for bruxism (teeth grinding)?',
    answer:
      'Typically 50–70 units total (25–35 per side). The muscles involved in grinding tend to be stronger and need more botulinum toxin.',
  },
  {
    question: 'Can I ask for fewer units to save money?',
    answer:
      'Yes, but under-dosing reduces results and may mean the treatment wears off sooner. It is generally better to use the recommended dose and space out treatments.',
  },
  {
    question: 'What happens if I get too many units?',
    answer:
      'Overdosing the masseter can temporarily affect your ability to chew hard foods or cause subtle smile changes. This is why experienced injectors start conservatively.',
  },
  {
    question: 'Does the brand of botulinum toxin affect how many units I need?',
    answer:
      'Yes. Dysport units are not equivalent to Botox units—roughly 2.5 Dysport units equal 1 Botox unit. Your provider converts the dose automatically.',
  },
]

export default function UnitsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="max-w-3xl mx-auto px-5 py-10">
        <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
          Dosage Guide
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          How Many Units of Botox Do You Need for Masseter Treatment?
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          Getting the right number of units is the difference between great results and an
          undertreated or overtreated jaw. This guide explains typical dosage ranges for jaw
          slimming and bruxism, and the factors that influence how many units you personally need.
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            Typical Dosage Ranges
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-secondary text-left">
                  <th className="px-4 py-3 font-semibold text-foreground rounded-tl-xl">Treatment</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Per Side</th>
                  <th className="px-4 py-3 font-semibold text-foreground rounded-tr-xl">Total</th>
                </tr>
              </thead>
              <tbody>
                {DOSAGE_ROWS.map(({ label, perSide, total }, i) => (
                  <tr key={label} className={i % 2 === 0 ? 'bg-background' : 'bg-card'}>
                    <td className="px-4 py-3 text-foreground font-medium">{label}</td>
                    <td className="px-4 py-3 text-muted-foreground">{perSide}</td>
                    <td className="px-4 py-3 text-primary font-medium">{total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            How Jaw Muscle Size Affects Dosage
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The masseter muscle varies significantly in size between individuals. A provider
            assesses this by palpating (feeling) the muscle when you clench your teeth.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm leading-relaxed">
            <li><strong className="text-foreground">Small or subtle jaw muscles:</strong> 15–20 units per side is often sufficient</li>
            <li><strong className="text-foreground">Average jaw muscles:</strong> 20–30 units per side is the standard range</li>
            <li><strong className="text-foreground">Large or prominent jaw muscles:</strong> 25–40 units per side may be needed</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3 text-sm">
            Our calculator asks you to assess your jaw muscle size because it is one of the
            strongest predictors of how many units you will need.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            How Muscle Build Affects Dosage
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            On average, patients with typically male jaw muscles require 30–50% more units than the
            baseline because testosterone-driven muscle development produces larger, more powerful
            masseter muscles. Your provider will assess your individual anatomy rather than relying
            on gender alone.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            First-Time vs. Maintenance Dosing
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            First-time patients typically receive a conservative dose for two reasons:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-1.5 text-sm leading-relaxed">
            <li>To assess how your muscle responds to botulinum toxin</li>
            <li>To reduce the risk of over-relaxing nearby muscles on the first treatment</li>
          </ol>
          <p className="text-muted-foreground leading-relaxed mt-3">
            After your first treatment, your provider can increase or maintain the dose based on
            results. With repeated treatments, the muscle gradually reduces in bulk and some
            patients need lower maintenance doses over time.
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
            <strong>Medical Disclaimer:</strong> Dosage estimates are based on published clinical
            guidelines. Your actual dosage will be determined by a qualified medical professional
            based on your anatomy and treatment goals.
          </p>
        </div>
      </main>
    </>
  )
}
