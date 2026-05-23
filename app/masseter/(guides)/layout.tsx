import { ChevronRight, Calculator } from 'lucide-react'

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-secondary border-b border-border">
        <ol role="list" className="max-w-3xl mx-auto px-5 py-2.5 flex items-center gap-1.5 text-xs text-muted-foreground list-none">
          <li><a href="/" className="hover:text-foreground transition-colors">BotoxCalc</a></li>
          <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
          <li className="text-foreground font-medium">Masseter Botox</li>
        </ol>
      </nav>

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
