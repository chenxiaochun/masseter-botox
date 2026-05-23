import type { Metadata } from 'next'
import { ShieldCheck, AlertTriangle } from 'lucide-react'
import FAQ from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Masseter Botox Recovery & Side Effects: Complete Aftercare Guide | BotoxCalc',
  description:
    'Masseter botox recovery is minimal—most patients return to work the same day. Learn aftercare instructions, common side effects, and when to contact your provider.',
  alternates: { canonical: '/masseter/recovery' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Masseter Botox Recovery: What to Do (and Avoid) After Treatment',
  description: 'Complete aftercare guide for masseter botox including day-of instructions, normal side effects, and warning signs.',
  author: { '@type': 'Organization', name: 'BotoxCalc' },
  datePublished: '2026-05-23',
}

const faqs = [
  {
    question: 'How long is recovery after masseter botox?',
    answer:
      'There is no true recovery period. You can return to work and normal activities the same day. The main restrictions apply only for the first 4–24 hours.',
  },
  {
    question: 'Can I eat normally after masseter botox?',
    answer:
      'Yes. Avoid very hard, chewy foods in the first few days if your jaw is sore, but there is no strict dietary restriction.',
  },
  {
    question: 'Is bruising common after masseter botox?',
    answer:
      'Mild bruising occurs in about 20–30% of patients. It typically resolves in 2–5 days. Arnica supplements or topical arnica gel may help.',
  },
  {
    question: 'Can I exercise after masseter botox?',
    answer:
      'Wait 24 hours before any strenuous exercise to minimise the risk of toxin migration from increased blood flow.',
  },
  {
    question: 'Why does my jaw feel asymmetrical after treatment?',
    answer:
      'Mild asymmetry is very common in the first 2–4 weeks as both masseter muscles relax at slightly different rates. It typically self-resolves. If asymmetry is noticeable at 4 weeks, contact your provider for a review.',
  },
]

export default function RecoveryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="max-w-3xl mx-auto px-5 py-10">
        <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
          Recovery Guide
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Masseter Botox Recovery: What to Do (and Avoid) After Treatment
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          Masseter botox has virtually no downtime—most patients return to normal activities
          immediately. But following the right aftercare instructions in the first 24 hours
          protects your results and reduces the risk of side effects.
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            Aftercare: Day of Treatment
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-4 ring-1 ring-green-200 dark:ring-green-800">
              <p className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wide mb-3">Do</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Stay upright for 4 hours after injection</li>
                <li>✓ Apply a cold pack gently to reduce swelling</li>
                <li>✓ Resume normal daily activities</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-4 ring-1 ring-red-200 dark:ring-red-800">
              <p className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wide mb-3">Avoid</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✗ Lying down flat for 4 hours</li>
                <li>✗ Massaging or rubbing the injection area</li>
                <li>✗ Strenuous exercise for 24 hours</li>
                <li>✗ Alcohol for 24 hours</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            What Is Normal in the First Week
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm leading-relaxed">
            <li>Mild swelling or redness: Normal, resolves in 24–48 hours</li>
            <li>Small lumps at injection sites: Normal, resolves within a few days</li>
            <li>Mild bruising: Normal, especially with larger volumes</li>
            <li>Slight jaw soreness or fatigue when chewing: Normal</li>
            <li>Mild asymmetry: Very common in weeks 1–4 as both sides relax at different rates</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            Side Effects: What to Watch For
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            <strong className="text-foreground">Less common but worth watching:</strong>
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm leading-relaxed">
            <li>Difficulty chewing hard foods: If pronounced or persistent past 3 weeks, contact your provider</li>
            <li>Smile asymmetry: If one corner of your mouth droops differently, contact your provider within 2 weeks</li>
            <li>Headache: Usually mild and resolves within 24 hours</li>
          </ul>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl px-5 py-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-foreground text-sm mb-2">When to Contact Your Provider</h2>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li>• Severe pain not managed by over-the-counter pain relief</li>
                <li>• Significant asymmetry affecting your smile (not just the jaw outline)</li>
                <li>• Difficulty swallowing</li>
                <li>• Signs of infection: increasing warmth, redness, or discharge</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            Long-Term Care
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Avoid prolonged chewing of very hard foods (ice, hard candy) for the first 3–4 weeks.
            No specific long-term restrictions once initial effects are established.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Book your next appointment at 4–5 months for jaw slimming; 3–4 months for bruxism.
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
            <strong>Medical Disclaimer:</strong> This information is for general guidance only.
            Always follow the specific aftercare instructions provided by your own injector.
          </p>
        </div>
      </main>
    </>
  )
}
