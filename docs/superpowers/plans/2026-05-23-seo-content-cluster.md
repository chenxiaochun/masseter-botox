# SEO Content Cluster: Masseter Botox Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add six informational spoke pages around the existing masseter botox calculator to build topical authority and rank for high-value keywords globally.

**Architecture:** Route group `app/masseter/(guides)/` holds a shared layout (breadcrumb + CTA) and six page files. The hub calculator at `app/masseter/page.tsx` is unchanged except for a new "Learn More" section. Sitemap updated with all new URLs.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, `FAQ` component (`@/components/FAQ`), `lucide-react` icons.

---

## File Map

| Action | Path |
|--------|------|
| Create | `app/masseter/(guides)/layout.tsx` |
| Create | `app/masseter/(guides)/guide/page.tsx` |
| Create | `app/masseter/(guides)/cost/page.tsx` |
| Create | `app/masseter/(guides)/units/page.tsx` |
| Create | `app/masseter/(guides)/before-after/page.tsx` |
| Create | `app/masseter/(guides)/recovery/page.tsx` |
| Create | `app/masseter/(guides)/bruxism/page.tsx` |
| Modify | `app/masseter/page.tsx` (add Learn More section) |
| Modify | `app/sitemap.ts` (add 6 URLs, fix BASE_URL) |
| Create | `__tests__/pages/guides-layout.test.tsx` |
| Create | `__tests__/pages/masseter-guide.test.tsx` |
| Create | `__tests__/pages/masseter-cost.test.tsx` |
| Create | `__tests__/pages/masseter-units.test.tsx` |
| Create | `__tests__/pages/masseter-before-after.test.tsx` |
| Create | `__tests__/pages/masseter-recovery.test.tsx` |
| Create | `__tests__/pages/masseter-bruxism.test.tsx` |
| Create | `__tests__/pages/masseter-hub.test.tsx` |
| Create | `__tests__/app/sitemap.test.ts` |

**URL routing note:** Next.js route groups (folders in parentheses) do NOT appear in URLs. `app/masseter/(guides)/cost/page.tsx` serves `/masseter/cost`.

---

## Task 1: Guides Layout (Breadcrumb + CTA Footer)

**Files:**
- Create: `app/masseter/(guides)/layout.tsx`
- Create: `__tests__/pages/guides-layout.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/pages/guides-layout.test.tsx
import { render, screen } from '@testing-library/react'
import GuidesLayout from '@/app/masseter/(guides)/layout'

describe('GuidesLayout', () => {
  it('renders breadcrumb with BotoxCalc link', () => {
    render(<GuidesLayout><div>content</div></GuidesLayout>)
    expect(screen.getByRole('link', { name: /botoxcalc/i })).toHaveAttribute('href', '/')
  })

  it('renders Masseter Botox breadcrumb segment', () => {
    render(<GuidesLayout><div>content</div></GuidesLayout>)
    expect(screen.getByText('Masseter Botox')).toBeInTheDocument()
  })

  it('renders CTA link to calculator', () => {
    render(<GuidesLayout><div>content</div></GuidesLayout>)
    expect(screen.getByRole('link', { name: /use the free calculator/i }))
      .toHaveAttribute('href', '/masseter')
  })

  it('renders children content', () => {
    render(<GuidesLayout><div>test-child</div></GuidesLayout>)
    expect(screen.getByText('test-child')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test __tests__/pages/guides-layout.test.tsx
```
Expected: FAIL — "Cannot find module '@/app/masseter/(guides)/layout'"

- [ ] **Step 3: Create the layout**

```tsx
// app/masseter/(guides)/layout.tsx
import { ChevronRight, Calculator } from 'lucide-react'

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-3xl mx-auto px-5 py-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">BotoxCalc</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Masseter Botox</span>
        </div>
      </div>

      {children}

      {/* CTA footer */}
      <div className="bg-primary/8 border-t border-primary/20 mt-12">
        <div className="max-w-3xl mx-auto px-5 py-8 text-center">
          <p className="text-sm font-semibold text-foreground mb-1">
            Ready to estimate your units and cost?
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Get a personalised estimate based on your jaw muscle size, build, and country.
          </p>
          <a
            href="/masseter"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Calculator className="w-4 h-4" />
            Use the Free Calculator
          </a>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test __tests__/pages/guides-layout.test.tsx
```
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add app/masseter/'(guides)'/layout.tsx __tests__/pages/guides-layout.test.tsx
git commit -m "feat: add guides route group layout with breadcrumb and CTA"
```

---

## Task 2: `/masseter/guide` — Complete Guide Page

**Files:**
- Create: `app/masseter/(guides)/guide/page.tsx`
- Create: `__tests__/pages/masseter-guide.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/pages/masseter-guide.test.tsx
import { render, screen } from '@testing-library/react'
import GuidePage from '@/app/masseter/(guides)/guide/page'

describe('Masseter Guide Page', () => {
  it('renders H1 with correct text', () => {
    render(<GuidePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'The Complete Guide to Masseter Botox'
    )
  })

  it('renders FAQ section', () => {
    render(<GuidePage />)
    expect(screen.getByText('Is masseter botox permanent?')).toBeInTheDocument()
  })

  it('renders results timeline section', () => {
    render(<GuidePage />)
    expect(screen.getByText(/Results Timeline/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test __tests__/pages/masseter-guide.test.tsx
```
Expected: FAIL — "Cannot find module '@/app/masseter/(guides)/guide/page'"

- [ ] **Step 3: Create the guide page**

```tsx
// app/masseter/(guides)/guide/page.tsx
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
  url: 'https://seoer.vercel.app/masseter/guide',
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test __tests__/pages/masseter-guide.test.tsx
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add 'app/masseter/(guides)/guide/page.tsx' __tests__/pages/masseter-guide.test.tsx
git commit -m "feat: add /masseter/guide complete guide page"
```

---

## Task 3: `/masseter/cost` — Cost Guide Page

**Files:**
- Create: `app/masseter/(guides)/cost/page.tsx`
- Create: `__tests__/pages/masseter-cost.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/pages/masseter-cost.test.tsx
import { render, screen } from '@testing-library/react'
import CostPage from '@/app/masseter/(guides)/cost/page'

describe('Masseter Cost Page', () => {
  it('renders H1 with correct text', () => {
    render(<CostPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Masseter Botox Cost'
    )
  })

  it('renders FAQ section', () => {
    render(<CostPage />)
    expect(screen.getByText(/How much does masseter botox cost per unit/i)).toBeInTheDocument()
  })

  it('renders price comparison section', () => {
    render(<CostPage />)
    expect(screen.getByText(/United States/i)).toBeInTheDocument()
    expect(screen.getByText(/United Kingdom/i)).toBeInTheDocument()
    expect(screen.getByText(/Australia/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test __tests__/pages/masseter-cost.test.tsx
```
Expected: FAIL — "Cannot find module '@/app/masseter/(guides)/cost/page'"

- [ ] **Step 3: Create the cost page**

```tsx
// app/masseter/(guides)/cost/page.tsx
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
  url: 'https://seoer.vercel.app/masseter/cost',
}

const PRICES = [
  { country: 'United States', perUnit: '$12–$20', total: '$480–$1,200', avg: '$700–$900', currency: 'USD' },
  { country: 'United Kingdom', perUnit: '£8–£15', total: '£320–£900', avg: '£500–£650', currency: 'GBP' },
  { country: 'Australia', perUnit: 'A$12–A$22', total: 'A$480–A$1,320', avg: 'A$700–A$900', currency: 'AUD' },
  { country: 'Canada', perUnit: 'CA$10–CA$18', total: 'CA$400–CA$1,080', avg: 'CA$600–CA$800', currency: 'CAD' },
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
            your provider&apos;s credentials and ask to see before-and-after photos.
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test __tests__/pages/masseter-cost.test.tsx
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add 'app/masseter/(guides)/cost/page.tsx' __tests__/pages/masseter-cost.test.tsx
git commit -m "feat: add /masseter/cost pricing guide page"
```

---

## Task 4: `/masseter/units` — Units & Dosage Page

**Files:**
- Create: `app/masseter/(guides)/units/page.tsx`
- Create: `__tests__/pages/masseter-units.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/pages/masseter-units.test.tsx
import { render, screen } from '@testing-library/react'
import UnitsPage from '@/app/masseter/(guides)/units/page'

describe('Masseter Units Page', () => {
  it('renders H1 with correct text', () => {
    render(<UnitsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'How Many Units of Botox'
    )
  })

  it('renders FAQ section', () => {
    render(<UnitsPage />)
    expect(screen.getByText(/How many units of Botox for jaw slimming/i)).toBeInTheDocument()
  })

  it('renders dosage ranges section', () => {
    render(<UnitsPage />)
    expect(screen.getByText(/Typical Dosage Ranges/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test __tests__/pages/masseter-units.test.tsx
```
Expected: FAIL — "Cannot find module '@/app/masseter/(guides)/units/page'"

- [ ] **Step 3: Create the units page**

```tsx
// app/masseter/(guides)/units/page.tsx
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
  url: 'https://seoer.vercel.app/masseter/units',
}

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

const DOSAGE_ROWS = [
  { label: 'Jaw slimming – standard', perSide: '20–30 units', total: '40–60 units' },
  { label: 'Jaw slimming – first-time', perSide: '15–25 units', total: '30–50 units' },
  { label: 'Bruxism – standard', perSide: '25–35 units', total: '50–70 units' },
  { label: 'Bruxism – severe grinding', perSide: '30–40 units', total: '60–80 units' },
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test __tests__/pages/masseter-units.test.tsx
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add 'app/masseter/(guides)/units/page.tsx' __tests__/pages/masseter-units.test.tsx
git commit -m "feat: add /masseter/units dosage guide page"
```

---

## Task 5: `/masseter/before-after` — Timeline Page

**Files:**
- Create: `app/masseter/(guides)/before-after/page.tsx`
- Create: `__tests__/pages/masseter-before-after.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/pages/masseter-before-after.test.tsx
import { render, screen } from '@testing-library/react'
import BeforeAfterPage from '@/app/masseter/(guides)/before-after/page'

describe('Masseter Before-After Page', () => {
  it('renders H1 with correct text', () => {
    render(<BeforeAfterPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Masseter Botox Before and After'
    )
  })

  it('renders FAQ section', () => {
    render(<BeforeAfterPage />)
    expect(screen.getByText(/How long until I see results/i)).toBeInTheDocument()
  })

  it('renders peak results section', () => {
    render(<BeforeAfterPage />)
    expect(screen.getByText(/Month 3/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test __tests__/pages/masseter-before-after.test.tsx
```
Expected: FAIL — "Cannot find module '@/app/masseter/(guides)/before-after/page'"

- [ ] **Step 3: Create the before-after page**

```tsx
// app/masseter/(guides)/before-after/page.tsx
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
  url: 'https://seoer.vercel.app/masseter/before-after',
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
          Results & Timeline
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
          <div className="relative">
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-border hidden sm:block" />
            <div className="space-y-0">
              {TIMELINE.map(({ period, heading, text }, i) => (
                <div key={period} className="flex gap-0 sm:gap-6 pb-8 last:pb-0">
                  <div className="hidden sm:flex flex-col items-end w-20 shrink-0 pt-1">
                    <span className="text-xs font-bold text-primary text-right leading-tight">{period}</span>
                  </div>
                  <div className="flex-1 bg-card rounded-2xl p-5 ring-1 ring-border">
                    <div className="sm:hidden text-xs font-bold text-primary mb-1">{period}</div>
                    <h3 className="font-semibold text-foreground text-sm mb-2">{heading}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test __tests__/pages/masseter-before-after.test.tsx
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add 'app/masseter/(guides)/before-after/page.tsx' __tests__/pages/masseter-before-after.test.tsx
git commit -m "feat: add /masseter/before-after results timeline page"
```

---

## Task 6: `/masseter/recovery` — Recovery & Side Effects Page

**Files:**
- Create: `app/masseter/(guides)/recovery/page.tsx`
- Create: `__tests__/pages/masseter-recovery.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/pages/masseter-recovery.test.tsx
import { render, screen } from '@testing-library/react'
import RecoveryPage from '@/app/masseter/(guides)/recovery/page'

describe('Masseter Recovery Page', () => {
  it('renders H1 with correct text', () => {
    render(<RecoveryPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Masseter Botox Recovery'
    )
  })

  it('renders FAQ section', () => {
    render(<RecoveryPage />)
    expect(screen.getByText(/How long is recovery after masseter botox/i)).toBeInTheDocument()
  })

  it('renders aftercare section', () => {
    render(<RecoveryPage />)
    expect(screen.getByText(/Aftercare/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test __tests__/pages/masseter-recovery.test.tsx
```
Expected: FAIL — "Cannot find module '@/app/masseter/(guides)/recovery/page'"

- [ ] **Step 3: Create the recovery page**

```tsx
// app/masseter/(guides)/recovery/page.tsx
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
  url: 'https://seoer.vercel.app/masseter/recovery',
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test __tests__/pages/masseter-recovery.test.tsx
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add 'app/masseter/(guides)/recovery/page.tsx' __tests__/pages/masseter-recovery.test.tsx
git commit -m "feat: add /masseter/recovery aftercare and side effects page"
```

---

## Task 7: `/masseter/bruxism` — Bruxism Page

**Files:**
- Create: `app/masseter/(guides)/bruxism/page.tsx`
- Create: `__tests__/pages/masseter-bruxism.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/pages/masseter-bruxism.test.tsx
import { render, screen } from '@testing-library/react'
import BruxismPage from '@/app/masseter/(guides)/bruxism/page'

describe('Masseter Bruxism Page', () => {
  it('renders H1 with correct text', () => {
    render(<BruxismPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Botox for Bruxism'
    )
  })

  it('renders FAQ section', () => {
    render(<BruxismPage />)
    expect(screen.getByText(/How is bruxism botox different from jaw slimming/i)).toBeInTheDocument()
  })

  it('renders dosage comparison section', () => {
    render(<BruxismPage />)
    expect(screen.getByText(/Bruxism Dosage vs\. Jaw Slimming/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test __tests__/pages/masseter-bruxism.test.tsx
```
Expected: FAIL — "Cannot find module '@/app/masseter/(guides)/bruxism/page'"

- [ ] **Step 3: Create the bruxism page**

```tsx
// app/masseter/(guides)/bruxism/page.tsx
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
  url: 'https://seoer.vercel.app/masseter/bruxism',
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test __tests__/pages/masseter-bruxism.test.tsx
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add 'app/masseter/(guides)/bruxism/page.tsx' __tests__/pages/masseter-bruxism.test.tsx
git commit -m "feat: add /masseter/bruxism teeth grinding guide page"
```

---

## Task 8: Update Hub — Add "Learn More" Section

**Files:**
- Modify: `app/masseter/page.tsx` (add Learn More cards after FAQ, before disclaimer)
- Create: `__tests__/pages/masseter-hub.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/pages/masseter-hub.test.tsx
import { render, screen } from '@testing-library/react'
import MasseterPage from '@/app/masseter/page'

describe('Masseter Hub Page - Learn More section', () => {
  it('renders Learn More heading', () => {
    render(<MasseterPage />)
    expect(screen.getByText('Learn More About Masseter Botox')).toBeInTheDocument()
  })

  it('renders link to cost guide', () => {
    render(<MasseterPage />)
    expect(screen.getByRole('link', { name: /cost guide/i })).toHaveAttribute(
      'href',
      '/masseter/cost'
    )
  })

  it('renders link to units guide', () => {
    render(<MasseterPage />)
    expect(screen.getByRole('link', { name: /units & dosage/i })).toHaveAttribute(
      'href',
      '/masseter/units'
    )
  })

  it('renders all 6 guide links', () => {
    render(<MasseterPage />)
    const hrefs = screen.getAllByRole('link').map((l) => l.getAttribute('href'))
    ;[
      '/masseter/guide',
      '/masseter/cost',
      '/masseter/units',
      '/masseter/before-after',
      '/masseter/recovery',
      '/masseter/bruxism',
    ].forEach((href) => expect(hrefs).toContain(href))
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test __tests__/pages/masseter-hub.test.tsx
```
Expected: FAIL — "Unable to find an element with the text: 'Learn More About Masseter Botox'"

- [ ] **Step 3: Add the Learn More section to `app/masseter/page.tsx`**

In `app/masseter/page.tsx`, add `GUIDE_LINKS` constant after `HOW_TO_STEPS` and add a new section between the FAQ and disclaimer.

Add this constant after `HOW_TO_STEPS` (around line 67):

```tsx
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
```

Add this section between the `</section>` closing tag of the FAQ section and the disclaimer `<div>` (around line 203):

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test __tests__/pages/masseter-hub.test.tsx
```
Expected: PASS (4 tests)

- [ ] **Step 5: Run full test suite to verify no regressions**

```bash
yarn test
```
Expected: all existing tests still PASS

- [ ] **Step 6: Commit**

```bash
git add app/masseter/page.tsx __tests__/pages/masseter-hub.test.tsx
git commit -m "feat: add Learn More guide links section to masseter hub page"
```

---

## Task 9: Update Sitemap

**Files:**
- Modify: `app/sitemap.ts`
- Create: `__tests__/app/sitemap.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// __tests__/app/sitemap.test.ts
import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  it('includes /masseter/guide', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/guide'))).toBe(true)
  })

  it('includes /masseter/cost', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/cost'))).toBe(true)
  })

  it('includes /masseter/units', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/units'))).toBe(true)
  })

  it('includes /masseter/before-after', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/before-after'))).toBe(true)
  })

  it('includes /masseter/recovery', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/recovery'))).toBe(true)
  })

  it('includes /masseter/bruxism', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/bruxism'))).toBe(true)
  })

  it('does not use yourdomain.com placeholder', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.includes('yourdomain.com'))).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test __tests__/app/sitemap.test.ts
```
Expected: FAIL — 6 URLs missing and yourdomain.com still present

- [ ] **Step 3: Update `app/sitemap.ts`**

Replace the entire file:

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://seoer.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/masseter`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/masseter/guide`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/cost`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/units`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/before-after`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/recovery`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/bruxism`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`,                  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/privacy`,                lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
```

Also update `app/layout.tsx` line 22 — change `metadataBase`:

```tsx
// Change:
  metadataBase: new URL('https://yourdomain.com'),
// To:
  metadataBase: new URL('https://seoer.vercel.app'),
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
yarn test __tests__/app/sitemap.test.ts
```
Expected: PASS (7 tests)

- [ ] **Step 5: Run full test suite**

```bash
yarn test
```
Expected: all tests PASS

- [ ] **Step 6: Commit**

```bash
git add app/sitemap.ts app/layout.tsx __tests__/app/sitemap.test.ts
git commit -m "feat: update sitemap with 6 new guide URLs and fix BASE_URL"
```
