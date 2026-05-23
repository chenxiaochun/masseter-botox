import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import FAQ from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Botox for Bruxism (Teeth Grinding): Dosage, Results & Cost | BotoxCalc',
  description:
    'Botox for bruxism: 25–35 units per side reduces grinding force and jaw pain within 1–2 weeks. Lasts 3–4 months. Price guide for US, UK, Australia, Canada.',
  alternates: { canonical: '/masseter/bruxism' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Botox for Bruxism (Teeth Grinding): Dosage, Results & Cost',
  description: 'How botulinum toxin treats bruxism, how dosage differs from jaw slimming, and what it costs in four countries.',
  author: { '@type': 'Organization', name: 'BotoxCalc' },
  datePublished: '2026-05-23',
}

const BRUXISM_PRICES = [
  { country: 'United States', range: '$600–$1,400', vs: '$480–$1,200' },
  { country: 'United Kingdom', range: '£400–£1,050', vs: '£320–£900' },
  { country: 'Australia', range: 'A$600–A$1,540', vs: 'A$480–A$1,320' },
  { country: 'Canada', range: 'CA$500–CA$1,260', vs: 'CA$400–CA$1,080' },
]

const faqs = [
  {
    question: 'How is bruxism botox different from jaw slimming botox?',
    answer:
      'The injection sites are similar, but bruxism treatment uses higher doses to significantly reduce grinding force. Jaw slimming uses lower doses focused on aesthetic muscle reduction.',
  },
  {
    question: 'Will bruxism botox affect my ability to chew?',
    answer:
      'At therapeutic doses, chewing function is preserved. You may notice mild fatigue when eating very hard foods in the first few weeks, but this is temporary.',
  },
  {
    question: 'How many treatments before seeing long-term improvement in bruxism?',
    answer:
      'Most patients notice immediate relief from the first treatment. Long-term reduction in bruxism severity typically develops after 2–4 treatments as the muscle gradually reduces in activity.',
  },
  {
    question: 'Can I use a night guard instead of botox for bruxism?',
    answer:
      'Night guards protect your teeth from damage but do not reduce muscle activity. Botox reduces the grinding force itself. Many patients use both.',
  },
  {
    question: 'Does botox cure bruxism?',
    answer:
      'No. Botox manages bruxism symptoms; it does not cure the underlying cause (which is often stress-related). When treatment stops, bruxism typically returns.',
  },
]

export default function BruxismPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="max-w-3xl mx-auto px-5 py-10">
        <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
          Bruxism Treatment
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Botox for Bruxism (Teeth Grinding): Dosage, Results &amp; Cost
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          Botulinum toxin is one of the most effective treatments for bruxism—the habitual
          grinding or clenching of teeth. It reduces the force of muscle contractions, easing jaw
          pain, protecting teeth, and improving sleep quality.
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            How Botox Treats Bruxism
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Bruxism is driven by overactive masseter and temporalis muscles contracting during
            sleep or unconsciously during the day. Botulinum toxin injected into the masseter
            muscle reduces the intensity of these contractions without eliminating chewing
            function. The result: less grinding force, less tooth wear, reduced jaw pain, and
            fewer tension headaches.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            Bruxism Dosage vs. Jaw Slimming Dosage
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bruxism requires higher doses than jaw slimming because the goal is to significantly
            reduce muscle force rather than just reduce muscle bulk.
          </p>
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
                <tr className="bg-background">
                  <td className="px-4 py-3 text-foreground font-medium">Jaw slimming</td>
                  <td className="px-4 py-3 text-muted-foreground">20–30 units</td>
                  <td className="px-4 py-3 text-muted-foreground">40–60 units</td>
                </tr>
                <tr className="bg-card">
                  <td className="px-4 py-3 text-foreground font-medium">Bruxism (standard)</td>
                  <td className="px-4 py-3 text-muted-foreground">25–35 units</td>
                  <td className="px-4 py-3 text-primary font-medium">50–70 units</td>
                </tr>
                <tr className="bg-background">
                  <td className="px-4 py-3 text-foreground font-medium">Bruxism (severe)</td>
                  <td className="px-4 py-3 text-muted-foreground">30–40 units</td>
                  <td className="px-4 py-3 text-primary font-medium">60–80 units</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            How Quickly Does It Work?
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm leading-relaxed">
            <li>Jaw tension and pain: Eases within 1–2 weeks</li>
            <li>Reduction in grinding intensity: Noticeable within 2 weeks</li>
            <li>Headache relief: Many patients report improvement within 1–2 weeks</li>
            <li>Sleep improvement: Often improves within the first month</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            How Long Do Results Last?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Bruxism botox typically lasts 3–4 months—slightly shorter than jaw slimming results
            (4–6 months). This is because the grinding muscles work harder and metabolise the
            toxin faster. Regular treatment every 3–4 months maintains results. Some patients, with
            consistent treatment, find they can extend intervals over time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            Cost: Bruxism vs. Jaw Slimming
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Because bruxism requires more units, total cost is slightly higher:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-secondary text-left">
                  <th className="px-4 py-3 font-semibold text-foreground rounded-tl-xl">Country</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Bruxism</th>
                  <th className="px-4 py-3 font-semibold text-foreground rounded-tr-xl">Jaw Slimming</th>
                </tr>
              </thead>
              <tbody>
                {BRUXISM_PRICES.map(({ country, range, vs }, i) => (
                  <tr key={country} className={i % 2 === 0 ? 'bg-background' : 'bg-card'}>
                    <td className="px-4 py-3 text-foreground font-medium">{country}</td>
                    <td className="px-4 py-3 text-primary font-medium">{range}</td>
                    <td className="px-4 py-3 text-muted-foreground">{vs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            Is Bruxism Botox Covered by Insurance?
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm leading-relaxed">
            <li><strong className="text-foreground">United States:</strong> Some private insurers and FSA/HSA accounts cover botox for diagnosed TMJ/bruxism with a doctor&apos;s referral. Coverage varies—check with your insurer.</li>
            <li><strong className="text-foreground">Australia:</strong> Medicare does not cover it, but some private health extras may cover it with a dental referral.</li>
            <li><strong className="text-foreground">United Kingdom:</strong> Not covered by NHS. Available privately.</li>
            <li><strong className="text-foreground">Canada:</strong> Provincial plans do not cover it. Some extended benefit plans may cover it with a dental prescription.</li>
          </ul>
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
            <strong>Medical Disclaimer:</strong> BotoxCalc provides estimates based on published
            clinical guidelines. Always consult a qualified medical professional before any
            cosmetic procedure.
          </p>
        </div>
      </main>
    </>
  )
}
