import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import FAQ from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Complete Guide to Masseter Botox (2025) | BotoxCalc',
  description:
    'Everything you need to know about masseter botox: how it works, who it suits, dosage, results timeline, and risks. Evidence-based guide for jaw slimming and bruxism.',
  alternates: { canonical: '/masseter/guide' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Complete Guide to Masseter Botox (2025)',
  description:
    'A comprehensive guide to masseter botox covering how it works, candidacy, dosage, results timeline, and risks.',
  author: { '@type': 'Organization', name: 'BotoxCalc' },
  datePublished: '2026-05-23',
}

const faqs = [
  {
    question: 'Is masseter botox permanent?',
    answer:
      'No. Results last 4–6 months. With regular maintenance treatments, the muscle gradually becomes smaller and sessions may become less frequent.',
  },
  {
    question: 'Does masseter botox hurt?',
    answer:
      'Most patients describe a mild pinching sensation. The injections are quick and no anaesthesia is required, though numbing cream can be applied first.',
  },
  {
    question: 'How soon can I return to work after masseter botox?',
    answer:
      'Immediately. There is no downtime. Avoid strenuous exercise for 24 hours and do not massage the injection area.',
  },
  {
    question: 'Can masseter botox change my bite?',
    answer:
      'Rarely and temporarily. Some patients notice mild difficulty chewing very hard foods in the first 2–4 weeks. This resolves as the muscle adapts.',
  },
  {
    question: 'How do I know if my wide jaw is bone or muscle?',
    answer:
      'Clench your teeth firmly. If you feel and see the muscle bulk at the side of your jaw, muscle is contributing. A consultation with a provider can give a definitive assessment.',
  },
]

export default function GuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="max-w-3xl mx-auto px-5 py-10">
        <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
          Masseter Botox Guide
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          The Complete Guide to Masseter Botox (2025)
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          Masseter botox—also called jaw botox or jawline slimming botox—involves injecting
          botulinum toxin into the masseter muscle to reduce its size and activity. Whether your
          goal is a slimmer facial contour or relief from teeth grinding (bruxism), this guide
          covers everything you need to know.
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            What Is the Masseter Muscle?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The masseter is one of the primary muscles responsible for chewing. It runs along the
            side of your jaw from the cheekbone down to the lower jawbone. In some people, this
            muscle is enlarged—either naturally or from habits like teeth grinding or chewing hard
            foods—creating a square or wide jawline.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            How Does Botox Relax the Masseter?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Botulinum toxin (Botox, Dysport, or Xeomin) temporarily blocks the nerve signals that
            tell the masseter to contract. Without regular full contractions, the muscle gradually
            reduces in size—a process called atrophy. This dual effect (reduced muscle activity +
            reduced muscle bulk) is what makes masseter botox effective for both jaw slimming and
            bruxism relief.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            Who Is a Good Candidate?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Masseter botox works best if you:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm leading-relaxed">
            <li>Have a visibly enlarged or square jaw due to muscle bulk (not bone structure)</li>
            <li>Experience jaw pain, teeth grinding, or clenching (bruxism)</li>
            <li>Want a non-surgical way to achieve a more oval or V-shaped facial contour</li>
            <li>Are in good general health and not pregnant or breastfeeding</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            It is less effective if your wide jaw is primarily due to bone structure rather than
            muscle.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            What to Expect at Your Appointment
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            A typical masseter botox session takes 15–30 minutes. Your provider will:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-1.5 text-sm leading-relaxed">
            <li>Assess your jaw muscle size and symmetry</li>
            <li>Mark injection points on each masseter (usually 2–4 per side)</li>
            <li>Inject the botulinum toxin using a fine needle</li>
          </ol>
          <p className="text-muted-foreground leading-relaxed mt-3">
            No anaesthesia is needed, though some providers apply topical numbing cream.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            Results Timeline
          </h2>
          <div className="space-y-3">
            {[
              { period: 'Days 1–7', text: 'The muscle begins to relax. Jaw tension may ease within the first week for bruxism patients.' },
              { period: 'Weeks 4–6', text: 'Visible slimming begins as the masseter muscle reduces in size.' },
              { period: 'Month 3', text: 'Peak slimming results. The jaw appears noticeably narrower.' },
              { period: 'Months 4–6', text: 'Effects begin to wear off. Most patients schedule maintenance at the 4–5 month mark.' },
            ].map(({ period, text }) => (
              <div key={period} className="flex gap-4 bg-card rounded-xl p-4 ring-1 ring-border">
                <span className="text-xs font-bold text-primary shrink-0 pt-0.5 w-20">{period}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            Risks and Side Effects
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            <strong className="text-foreground">Common (mild, temporary):</strong> bruising or
            swelling at injection sites (1–3 days), mild jaw soreness or fatigue, slight asymmetry
            that typically self-resolves.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            <strong className="text-foreground">Rare but important:</strong> smile asymmetry if
            nearby muscles are affected, temporary difficulty chewing hard foods, uneven results
            requiring a touch-up.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Always choose a qualified, licensed medical professional—a dermatologist, plastic
            surgeon, or trained cosmetic nurse injector.
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
            <strong>Medical Disclaimer:</strong> BotoxCalc provides estimates based on published
            clinical guidelines. Always consult a qualified medical professional before any
            cosmetic procedure.
          </p>
        </div>
      </main>
    </>
  )
}
