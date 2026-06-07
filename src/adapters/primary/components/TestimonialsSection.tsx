import { MockCMSAdapter } from '@/adapters/secondary/cms/MockCMSAdapter'
import { HexCell } from '@/adapters/primary/components/HexGrid'

const cms = new MockCMSAdapter()

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-zinc-300 text-zinc-300 dark:fill-zinc-600 dark:text-zinc-600'}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export async function TestimonialsSection() {
  const testimonials = await cms.getTestimonials()

  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-900" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Testimonios
          </span>
          <h2 id="testimonials-title" className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Lo Que Dicen Nuestros Clientes
          </h2>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <HexCell key={testimonial.id} delay={index * 150} className="!transform-none">
              <blockquote className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
                <Stars rating={testimonial.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="text-sm font-medium not-italic text-zinc-900 dark:text-zinc-50">
                      {testimonial.name}
                    </cite>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </HexCell>
          ))}
        </div>
      </div>
    </section>
  )
}
