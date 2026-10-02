import { images } from '@/assets/images'
import { ActivityCard } from '@/components/Activities/ActivityCard'
import { Container } from '@/components/common/Container'
import { PageBanner } from '@/components/common/PageBanner'
import { activities } from '@/data/activities'

export function ActivitiesPage() {
  return (
    <>
      <PageBanner
        title="Activities"
        description="Learning at Invictus goes well beyond textbooks — through seminars, sports, the arts, science and the NCC."
        breadcrumbs={[{ label: 'Activities' }]}
        image={images.heroCelebration}
      />
      <Container className="py-14 sm:py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <li key={activity.slug}>
              <ActivityCard activity={activity} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
