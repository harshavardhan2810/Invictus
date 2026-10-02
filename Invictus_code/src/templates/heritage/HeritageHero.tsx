import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { JaaliPattern } from '@/components/common/JaaliPattern'
import { LotusOrnament, Mandala } from '@/components/common/Ornaments'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import type { HeroSlide } from '@/data/home'
import { cn } from '@/lib/utils'

export function HeritageHero({ slides }: { slides: HeroSlide[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [plugins] = useState(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return [Autoplay({ delay: 7000, playOnInit: !prefersReducedMotion, stopOnInteraction: false }), Fade()]
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
    <section aria-label="Highlights" className="relative isolate overflow-hidden bg-background-subtle">
      <JaaliPattern className="-z-10 text-secondary-200/70" />
      <Carousel setApi={setApi} opts={{ loop: true, duration: 40 }} plugins={plugins}>
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex
            const Heading = index === 0 ? 'h1' : 'h2'

            return (
              <CarouselItem key={slide.id} className="pl-0" aria-label={`${index + 1} of ${slides.length}`}>
                <Container className="grid items-center gap-12 pt-12 pb-6 lg:grid-cols-2 lg:gap-16 lg:pt-16">
                  <div className={cn(isActive && 'animate-in duration-700 fade-in slide-in-from-left-6')}>
                    <p className="flex items-center gap-2.5 font-display text-lg text-accent italic">
                      <LotusOrnament className="h-5 text-secondary-500" />
                      {slide.eyebrow}
                    </p>
                    <Heading className="mt-4 font-display text-4xl leading-[1.1] font-bold text-balance text-primary-800 sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </Heading>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{slide.description}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {slide.primaryCta && (
                        <Button asChild size="lg">
                          <Link to={slide.primaryCta.href}>
                            {slide.primaryCta.label}
                            <ArrowRight />
                          </Link>
                        </Button>
                      )}
                      {slide.secondaryCta && (
                        <Button asChild size="lg" variant="outline" className="border-primary text-primary-800">
                          <Link to={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
                    <Mandala className="absolute -inset-12 text-secondary-400/50 motion-safe:animate-spin-slow" />
                    <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border-2 border-secondary" />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border-8 border-background shadow-2xl">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        className="size-full object-cover"
                      />
                    </div>
                  </div>
                </Container>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <div className="flex justify-center gap-2 pt-4 pb-10">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              aria-current={index === selectedIndex}
              className="p-1.5"
            >
              <span
                className={cn(
                  'block size-3 rotate-45 border-2 border-primary transition-colors',
                  index === selectedIndex ? 'bg-primary' : 'bg-transparent hover:bg-primary-200',
                )}
              />
            </button>
          ))}
        </div>
      </Carousel>
    </section>
  )
}
