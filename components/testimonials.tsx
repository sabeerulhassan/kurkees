'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  {
    name: 'Mihiri Wickramarathne',
    initials: 'MW',
    rating: 5,
    text: 'I got the peanut butter... IT IS YUMMY. I only eat the Bramwells brand coz I find an odd taste in all the others. Since I couldn\'t get it down, I was without peanut butter for few months. So this tasted heavenly... It is a perfect blend ❤️ please make a crunchy one with the same salt and sugar percentages... Definitely gonna buy more.',
  },
  {
    name: 'Ahamath Musafer',
    initials: 'AM',
    rating: 5,
    text: 'I have to say the texture of your peanut butter is on point and is excellent. Good Job on creating a fantastic product to international standards... You guys without a doubt are the best local manufactured peanut butter, simply coz it covers all the basics of an international branded peanut butter has... 👍👍👍',
  },
  {
    name: 'Nimanka Jayakody',
    initials: 'NJ',
    rating: 5,
    text: 'Hi, I received it today. It tastes awesome 😍 I have tasted so many peanut butters and have made even at home myself, so I can guarantee that this tastes 100% natural.',
  },
  {
    name: 'Shifka Zayan',
    initials: 'SZ',
    rating: 5,
    text: 'Thank you for the peanut butter, it was super yumm.!! The consistency of the cream was so good 💯 Definitely will put on my next order very soon. Update me the price of the crunchy peanut butter as well.',
  },
  {
    name: 'Jeewani Yatiwella',
    initials: 'JY',
    rating: 5,
    text: 'Harima rasai... quality product ekak.. Me wage quality, Sri Lankan product ekak; quality online බිස්නස් ekak katanawata thank u so much... ❤️ i wish u all the best... go ahead & ahead... 👍',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length)
  const next = () => setIndex((i) => (i + 1) % reviews.length)

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Desktop Grid Layout (3 Columns) */}
      <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
      </div>

      {/* Mobile / Tablet Carousel Layout */}
      <div className="md:hidden max-w-md mx-auto">
        <ReviewCard review={reviews[index]} />
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous review"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-card text-card-foreground transition-transform active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next review"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-card text-card-foreground transition-transform active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function ReviewCard({
  review,
}: {
  review: (typeof reviews)[number]
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border-2 border-border bg-card p-6 shadow-[0_6px_0_0_var(--border)]">
      <div>
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < review.rating
                  ? 'fill-accent text-accent'
                  : 'fill-muted text-muted'
              }`}
            />
          ))}
        </div>
        <p className="font-sans text-base leading-relaxed text-card-foreground whitespace-pre-line">
          “{review.text}”
        </p>
      </div>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky font-heading text-sm font-bold text-sky-foreground">
          {review.initials}
        </span>
        <span className="font-sans font-bold text-sm text-card-foreground line-clamp-1">
          {review.name}
        </span>
      </div>
    </div>
  )
}