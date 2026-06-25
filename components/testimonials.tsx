import { Star } from 'lucide-react'

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
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex snap-x gap-5 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
        {reviews.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
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
    <figure className="flex h-full min-w-[82%] snap-center flex-col justify-between rounded-3xl border-2 border-border bg-card p-6 shadow-[0_6px_0_0_var(--border)] sm:min-w-[60%] md:min-w-0">
      <div>
        <div className="mb-4 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
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
        <blockquote className="font-sans text-base leading-relaxed text-card-foreground whitespace-pre-line">
          “{review.text}”
        </blockquote>
      </div>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky font-heading text-sm font-bold text-sky-foreground">
          {review.initials}
        </span>
        <span className="font-sans font-bold text-sm text-card-foreground line-clamp-1">
          {review.name}
        </span>
      </figcaption>
    </figure>
  )
}
