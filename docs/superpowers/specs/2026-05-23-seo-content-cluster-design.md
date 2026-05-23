# SEO Content Cluster: Masseter Botox Design

**Goal:** Build a topic-cluster content architecture around the existing masseter botox calculator to establish topical authority and rank for high-value English-language keywords globally (US, UK, AU, CA).

**Architecture:** Hub-and-spoke model. The existing `/masseter` calculator is the hub. Six new informational spoke pages surround it, each targeting a distinct keyword cluster. All spokes link back to the calculator; the calculator page links out to each spoke.

**Tech Stack:** Next.js App Router, TypeScript TSX pages, Tailwind CSS, shadcn/ui, JSON-LD schema (Article + FAQPage). No blog infrastructure or dynamic routing required.

---

## Page Architecture

### Hub (existing)
- `/masseter` — Masseter Botox Calculator (tool page)

### Spoke Pages (new)

| Route | Primary Keyword | Secondary Keywords |
|-------|----------------|-------------------|
| `/masseter/guide` | masseter botox guide | jaw botox complete guide, what is masseter botox |
| `/masseter/cost` | masseter botox cost | jaw botox price, masseter botox price UK / AU / US |
| `/masseter/units` | how many units masseter botox | masseter botox dosage, jaw botox units |
| `/masseter/before-after` | masseter botox before and after | jaw botox results, masseter botox timeline |
| `/masseter/recovery` | masseter botox recovery | masseter botox side effects, jaw botox aftercare |
| `/masseter/bruxism` | botox for bruxism | teeth grinding botox, bruxism botox units |

---

## Technical Implementation

### File Structure

```
app/
  masseter/
    layout.tsx          ← NEW: shared guide layout (breadcrumb + CTA footer)
    page.tsx            ← existing calculator (hub)
    guide/
      page.tsx          ← NEW spoke
    cost/
      page.tsx          ← NEW spoke
    units/
      page.tsx          ← NEW spoke
    before-after/
      page.tsx          ← NEW spoke
    recovery/
      page.tsx          ← NEW spoke
    bruxism/
      page.tsx          ← NEW spoke
```

### Shared Guide Layout

Spoke pages share a layout that adds:
- Breadcrumb navigation: `BotoxCalc › Masseter Botox › [Page Title]`
- After `{children}`: CTA banner — "Ready to estimate your units and cost? → Use the Calculator"

The calculator hub (`app/masseter/page.tsx`) must NOT be wrapped by this layout. Use a **route group** to scope the layout to spokes only:

```
app/
  masseter/
    page.tsx                      ← hub calculator (root layout only)
    (guides)/
      layout.tsx                  ← breadcrumb + CTA footer for all spokes
      guide/page.tsx
      cost/page.tsx
      units/page.tsx
      before-after/page.tsx
      recovery/page.tsx
      bruxism/page.tsx
```

URLs are unchanged: `/masseter/guide`, `/masseter/cost`, etc. (route groups don't affect URLs).

### Sitemap Update (`app/sitemap.ts`)

- Update `BASE_URL` from `yourdomain.com` to `seoer.vercel.app`
- Add all 6 spoke URLs with `changeFrequency: 'monthly'` and `priority: 0.8`

---

## Content Structure Per Page

Every spoke page follows this template:

```
export const metadata: Metadata = {
  title: '[Keyword-rich title] | BotoxCalc',
  description: '[150-char meta description with primary keyword]',
  alternates: { canonical: '/masseter/[slug]' },
}

JSON-LD: Article schema + FAQPage schema (combined)

Page sections:
  H1: [Keyword-driven title]
  Lead paragraph (100–150 words)

  H2: [Topic section 1]
  H2: [Topic section 2]
  H2: [Topic section 3 — country comparison where applicable]
  H2: Frequently Asked Questions
    4–6 FAQ items (also in FAQPage JSON-LD)

  CTA card: "Get your personalised estimate" → /masseter
```

All content is AI-generated in English, targeting global English speakers. Word count target: 900–1400 words per page.

### Content Outline Per Page

**`/masseter/guide`** — Complete Guide to Masseter Botox
- What is the masseter muscle?
- How does botox relax the masseter?
- Who is a good candidate?
- What to expect during treatment
- Results timeline (weeks 1–12)
- Risks and contraindications
- FAQ: 5 questions

**`/masseter/cost`** — Masseter Botox Cost: Full Price Guide
- What affects the price (units, provider tier, location)
- Price ranges: US, UK, Australia, Canada (table)
- Price per unit vs. per treatment
- Why cheap providers are risky
- FAQ: 5 questions (including "Is masseter botox covered by insurance?")

**`/masseter/units`** — How Many Units of Botox for Masseter?
- Typical dosage ranges (jaw slimming vs. bruxism)
- How jaw size affects dosage (links to calculator's jaw size feature)
- How gender/muscle mass affects dosage
- First-time vs. maintenance dosing
- FAQ: 5 questions

**`/masseter/before-after`** — Masseter Botox Before and After: What to Expect
- Immediate post-injection (days 1–3)
- Week 1–2: initial relaxation
- Week 4–6: visible slimming begins
- Month 3: peak results
- Month 4–6: when to book maintenance
- FAQ: 5 questions

**`/masseter/recovery`** — Masseter Botox Recovery & Side Effects
- Day-of aftercare instructions
- Common side effects (swelling, bruising, asymmetry)
- Rare side effects (smile asymmetry, difficulty chewing)
- When to call your provider
- Activities to avoid (first 24h / first week)
- FAQ: 5 questions

**`/masseter/bruxism`** — Botox for Bruxism (Teeth Grinding): Dosage & Results
- How botox treats bruxism differently from jaw slimming
- Dosage differences (higher units, different endpoints)
- How quickly it relieves grinding and headaches
- Cost comparison: bruxism vs. jaw slimming
- Insurance considerations by country
- FAQ: 5 questions

---

## Internal Linking Strategy

**From hub (`/masseter`) to spokes:**
- Add a "Learn more" section below the FAQ on the calculator page
- 6 cards linking to each spoke with short description

**From each spoke back to hub:**
- CTA at end of every spoke: "Use the free calculator →"
- Inline contextual links (e.g., cost page links to calculator with anchor "calculate your exact cost")

**Between spokes:**
- `units` page links to `cost` page and vice versa
- `bruxism` page links to `units` page
- `guide` page links to all other spokes

---

## SEO Metadata Notes

- Every page: unique `<title>` and `<meta description>`
- Every page: `alternates.canonical` set explicitly
- Every page: `Article` JSON-LD with `datePublished: 2026-05-23`, `author: { @type: Organization, name: BotoxCalc }`
- Every page: `FAQPage` JSON-LD derived from the FAQ section
- Calculator hub: keep existing `WebApplication` schema, add links section

---

## Out of Scope

- Blog infrastructure (pagination, tags, RSS)
- Additional treatment areas beyond masseter
- Multilingual content
- User-generated content or comments
- City/location-specific landing pages
