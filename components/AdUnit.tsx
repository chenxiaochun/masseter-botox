'use client'

import { useEffect } from 'react'

interface Props {
  slot: string
  className?: string
}

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? ''

export default function AdUnit({ slot, className = '' }: Props) {
  useEffect(() => {
    if (!CLIENT) return
    try {
      // @ts-expect-error adsbygoogle is injected by the external AdSense script
      ;(window.adsbygoogle = window.adsbygoogle ?? []).push({})
    } catch {
      // Script not yet loaded — silently ignore
    }
  }, [])

  if (!CLIENT) {
    return (
      <div
        className={`bg-gray-100 rounded-lg flex items-center justify-center min-h-[90px] text-xs text-gray-400 ${className}`}
        aria-hidden="true"
      >
        Ad
      </div>
    )
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ minHeight: 90 }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
