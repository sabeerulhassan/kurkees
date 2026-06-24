import type { SVGProps } from 'react'

/* Playful hand-drawn doodle accents used as decorative elements across the site */

export function Star({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden {...props}>
      <path
        d="M50 6c4 22 18 36 40 40-22 4-36 18-40 40-4-22-18-36-40-40 22-4 36-18 40-40Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Peanut({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 70" className={className} fill="none" aria-hidden {...props}>
      <path
        d="M32 6C16 6 6 17 6 33s10 24 22 26c8 1 12 5 20 5s12-5 22-7c14-3 22-13 22-26S100 6 84 6c-9 0-14 6-26 6S43 6 32 6Z"
        stroke="currentColor"
        strokeWidth="5"
      />
      <circle cx="33" cy="30" r="4" fill="currentColor" />
      <circle cx="60" cy="34" r="4" fill="currentColor" />
      <circle cx="86" cy="30" r="4" fill="currentColor" />
    </svg>
  )
}

export function Leaf({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden {...props}>
      <path
        d="M84 14C44 14 14 38 14 78c0 0 0 8 4 8 40 0 64-30 64-70 0 0 2-2 2-2Z"
        fill="currentColor"
      />
      <path d="M22 78C40 60 58 46 78 36" stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function Squiggle({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 40" className={className} fill="none" aria-hidden {...props}>
      <path
        d="M4 20c20-24 40-24 56 0s36 24 56 0 36-24 40-12"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Spark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden {...props}>
      <path
        d="M30 4v52M4 30h52M11 11l38 38M49 11 11 49"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}
