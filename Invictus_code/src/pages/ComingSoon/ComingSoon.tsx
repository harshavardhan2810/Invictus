import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

import { images } from '@/assets/images'
import { Container } from '@/components/common/Container'
import { PageBanner } from '@/components/common/PageBanner'
import { Button } from '@/components/ui/button'

interface ComingSoonProps {
  title: string
  heading?: string
  description?: string
}

export function ComingSoon({
  title,
  heading = 'This page is coming soon',
  description = 'We’re preparing this page. In the meantime, explore the home page or contact the school office.',
}: ComingSoonProps) {
  return (
    <>
      <PageBanner title={title} breadcrumbs={[{ label: title }]} image={images.pageBanner} />
      <Container className="flex flex-col items-center py-20 text-center sm:py-28">
        <h2 className="font-display text-2xl font-bold text-primary-900 sm:text-3xl">{heading}</h2>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">{description}</p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/">
            <ArrowLeft />
            Back to home
          </Link>
        </Button>
      </Container>
    </>
  )
}
