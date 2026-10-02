import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import type { HeroSlide } from '@/data/home'
import { cn } from '@/lib/utils'

const AUTOPLAY_DELAY_MS = 6000

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [plugins] = useState(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return [
      Autoplay({
        delay: AUTOPLAY_DELAY_MS,
        playOnInit: !prefersReducedMotion,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
      Fade(),
    ]
  })

  useEffect(() => {
    if (!api) return
    const handleSelect = () => setSelectedIndex(api.selectedScrollSnap())
    handleSelect()
    api.on('select', handleSelect)
    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  return (
    <section aria-label="Highlights" className="bg-primary-950">
      <Carousel setApi={setApi} opts={{ loop: true, duration: 35 }} plugins={plugins}>
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex
            const Heading = index === 0 ? 'h1' : 'h2'

            return (
              <CarouselItem
                key={slide.id}
                className="pl-0"
                aria-label={`${index + 1} of ${slides.length}`}
              >
                <div className="relative isolate flex h-[500px] items-center overflow-hidden sm:h-[540px] lg:h-[600px]">
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className={cn(
                      'absolute inset-0 -z-10 size-full object-cover motion-safe:transition-transform motion-safe:duration-[7000ms] motion-safe:ease-out',
                      isActive ? 'scale-105' : 'scale-100',
                    )}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-linear-to-r from-primary-950/95 via-primary-950/70 to-primary-950/20"
                  />

                  <Container>
                    <div
                      className={cn(
                        'max-w-2xl pb-10 text-white lg:pb-20',
                        isActive && 'animate-in duration-700 fade-in slide-in-from-bottom-6',
                      )}
                    >
                      <p className="mb-4 inline-flex items-center gap-2 rounded-sm bg-secondary px-3 py-1 font-display text-xs font-semibold tracking-wider text-secondary-foreground uppercase sm:text-sm">
                        {slide.eyebrow}
                      </p>
                      <Heading className="font-display text-3xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
                        {slide.title}
                      </Heading>
                      <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
                        {slide.description}
                      </p>
                      {(slide.primaryCta || slide.secondaryCta) && (
                        <div className="mt-8 flex flex-wrap gap-3">
                          {slide.primaryCta && (
                            <Button asChild size="lg" variant="secondary">
                              <Link to={slide.primaryCta.href}>
                                {slide.primaryCta.label}
                                <ArrowRight />
                              </Link>
                            </Button>
                          )}
                          {slide.secondaryCta && (
                            <Button asChild size="lg" variant="outline-light">
                              <Link to={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </Container>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-4 lg:pb-24">
          <Container className="flex items-center justify-between gap-6">
            <div className="pointer-events-auto flex items-center">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                  aria-current={index === selectedIndex}
                  className="group px-1.5 py-3"
                >
                  <span
                    className={cn(
                      'block h-1.5 rounded-full transition-all duration-500',
                      index === selectedIndex
                        ? 'w-10 bg-secondary'
                        : 'w-5 bg-white/50 group-hover:bg-white/80',
                    )}
                  />
                </button>
              ))}
            </div>

            <div className="pointer-events-auto hidden items-center gap-3 sm:flex">
              <CarouselPrevious
                variant="outline-light"
                className="static size-11 translate-y-0 bg-white/5 backdrop-blur-sm"
              />
              <CarouselNext
                variant="outline-light"
                className="static size-11 translate-y-0 bg-white/5 backdrop-blur-sm"
              />
            </div>
          </Container>
        </div>
      </Carousel>
    </section>
  )
}
