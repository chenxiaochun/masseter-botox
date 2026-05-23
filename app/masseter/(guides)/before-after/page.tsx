import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import FAQ from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Masseter Botox Before and After: What to Expect | BotoxCalc',
  description:
    'Masseter botox results timeline: minimal change in week 1, visible slimming by week 4–6, peak results at month 3. Honest week-by-week breakdown.',
  alternates: { canonical: '/masseter/before-after' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Masseter Botox Before and After: Your Complete Timeline',
  description: 'A week-by-week timeline of what to expect after masseter botox treatment, from day 1 to month 6.',
  author: { '@type': 'Organization', name: 'BotoxCalc' },
  datePublished: '2026-05-23',
}

const TIMELINE = [
  {
    period: 'Day 0–2',
    heading: 'Immediately After',
    text: 'Minor redness or swelling at injection sites resolves within 24–48 hours. Some mild bruising may occur. Jaw tension may begin to ease within 48 hours for bruxism patients. No visible change in appearance yet.',
  },
  {
    period: 'Weeks 1–2',
    heading: 'Early Relaxation',
    text: 'The masseter muscle begins to relax. Teeth grinding and jaw clenching reduce noticeably. No visible slimming yet—the appearance is unchanged at this stage. Some patients notice their jaw feels lighter or less tense.',
  },
  {
    period: 'Weeks 4–6',
    heading: 'Visible Slimming Begins',
    text: 'As the masseter muscle reduces in activity, it begins to atrophy (shrink). The jawline gradually softens and narrows. This is the stage most patients first notice visible before-and-after differences.',
  },
  {
    period: 'Month 3',
    heading: 'Peak Results',
    text: 'Maximum slimming achieved. The jaw appears significantly narrower and more oval or V-shaped. This is the ideal time to take "after" photos for comparison. Bruxism patients see significant reduction in headaches and morning jaw pain.',
  },
  {
    period: 'Months 4–6',
    heading: 'Planning Maintenance',
    text: 'Effects begin to fade as the botulinum toxin metabolises. Most patients schedule their next treatment at the 4–5 month mark. With repeated treatments over 1–2 years, the muscle progressively reduces and some patients extend their treatment intervals.',
  },
]

const faqs = [
  {
    question: 'How long until I see results from masseter botox?',
    answer:
      'Reduced tension within 1–2 weeks. Visible slimming develops over 4–6 weeks. Peak results are reached at around 3 months.',
  },
  {
    question: 'Will my jaw look completely different?',
    answer:
      'Results are a gradual softening of the jawline, not a dramatic overnight change. Most patients describe the difference as natural-looking and proportionate.',
  },
  {
    question: 'What if I see no results at 4 weeks?',
    answer:
      'If there is no visible change and no reduction in jaw tension by 4 weeks, contact your provider. You may need a touch-up or a higher dose.',
  },
  {
    question: 'Will the slimming affect my face shape permanently?',
    answer:
      'No. Effects are temporary and reversible. If you stop treatments, the muscle gradually returns to its original size over 6–9 months.',
  },
  {
    question: 'How do I document my before and after results?',
    answer:
      'Take photos in the same lighting, at the same angle (front-on and 45° profile), in a relaxed jaw position. Morning light with no makeup gives the clearest comparison.',
  },
]

export default function BeforeAfterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="max-w-3xl mx-auto px-5 py-10">
        <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
          Results &amp; Timeline
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Masseter Botox Before and After: Your Complete Timeline
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          Knowing what to expect after masseter botox—and when—helps you assess whether your
          treatment is working. Results unfold gradually over 6–8 weeks. Here is an honest,
          stage-by-stage breakdown.
        </p>

        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-foreground mb-5">
            Week-by-Week Timeline
          </h2>
          <div className="space-y-4">
            {TIMELINE.map(({ period, heading, text }) => (
              <div key={period} className="bg-card rounded-2xl p-5 ring-1 ring-border">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full shrink-0">{period}</span>
                  <h3 className="font-semibold text-foreground text-sm">{heading}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">
            How to Take Before and After Photos
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Consistent photos are essential for tracking your results accurately:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm leading-relaxed">
            <li>Same lighting conditions each time (natural light works best)</li>
            <li>Same angles: front-on and 45° profile on both sides</li>
            <li>Relaxed jaw position—no smiling, no clenching</li>
            <li>Take photos before treatment, at 6 weeks, and at 3 months</li>
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
            <strong>Medical Disclaimer:</strong> Individual results vary. Always consult a
            qualified medical professional before any cosmetic procedure.
          </p>
        </div>
      </main>
    </>
  )
}
