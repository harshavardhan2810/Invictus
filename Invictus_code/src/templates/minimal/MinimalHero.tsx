import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import type { HeroSlide, Stat } from '@/data/home'
import { siteConfig } from '@/data/site'

interface MinimalHeroProps {
  slide: HeroSlide
  stats: Stat[]
}

export function MinimalHero({ slide, stats }: MinimalHeroProps) {
  return (
    <section aria-labelledby="hero-heading" className="pt-14 sm:pt-20">
      <Container className="text-center">
        <p className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-sm text-muted-foreground">
          <span aria-hidden className="size-2 rounded-full bg-secondary-500" />
          CBSE · Classes 8–12 · Hyderabad
        </p>
        <h1
          id="hero-heading"
          className="mx-auto mt-6 max-w-4xl font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          {slide.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{slide.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="secondary" size="lg" className="rounded-full">
            <Link to="/admissions/apply">
              Apply for {siteConfig.academicYear}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/programs">Explore programs</Link>
          </Button>
        </div>
      </Container>

      <Container className="mt-14">
        <img
          src={slide.image}
          alt={slide.imageAlt}
          className="aspect-[4/3] w-full rounded-2xl object-cover sm:aspect-[21/9]"
        />
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse border-b py-6 sm:border-b-0 sm:py-8">
              <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
