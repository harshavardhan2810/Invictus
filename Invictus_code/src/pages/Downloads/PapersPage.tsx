import { useMemo, useState } from 'react'
import { Download, FileText, Info, Search, X } from 'lucide-react'
import { NavLink } from 'react-router'

import { images } from '@/assets/images'
import { Container } from '@/components/common/Container'
import { PageBanner } from '@/components/common/PageBanner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/native-select'
import { paperCatalogues, type PaperCategory, type PaperType } from '@/data/papers'
import { cn } from '@/lib/utils'

const categoryTabs: { category: PaperCategory; label: string; href: string }[] = [
  { category: 'exam', label: 'Exam Papers', href: '/downloads/exam-papers' },
  { category: 'competitive', label: 'Competitive Papers', href: '/downloads/competitive-papers' },
]

const paperTypeClasses: Record<PaperType, string> = {
  'Question Paper': 'bg-primary-50 text-primary-700',
  'Sample Paper': 'bg-secondary-100 text-secondary-800',
  'Marking Scheme': 'bg-success-subtle text-success',
  'Answer Key': 'bg-accent-50 text-accent',
}

function getUniqueValues(values: (string | number)[]) {
  return [...new Set(values)]
}

function toFileName(title: string) {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}.pdf`
}

export function PapersPage({ category }: { category: PaperCategory }) {
  const catalogue = paperCatalogues[category]
  const [searchText, setSearchText] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const filterOptions = useMemo(
    () => ({
      groups: getUniqueValues(catalogue.papers.map((paper) => paper.group)).map(String),
      subjects: getUniqueValues(catalogue.papers.map((paper) => paper.subject)).map(String).sort(),
      years: getUniqueValues(catalogue.papers.map((paper) => paper.year))
        .map(Number)
        .sort((first, second) => second - first),
    }),
    [catalogue],
  )

  const normalisedSearch = searchText.trim().toLowerCase()
  const visiblePapers = catalogue.papers
    .filter((paper) => !selectedGroup || paper.group === selectedGroup)
    .filter((paper) => !selectedSubject || paper.subject === selectedSubject)
    .filter((paper) => !selectedYear || paper.year === Number(selectedYear))
    .filter((paper) => !normalisedSearch || paper.title.toLowerCase().includes(normalisedSearch))
    .sort((first, second) => second.year - first.year)

  const hasActiveFilters = Boolean(searchText || selectedGroup || selectedSubject || selectedYear)

  function clearFilters() {
    setSearchText('')
    setSelectedGroup('')
    setSelectedSubject('')
    setSelectedYear('')
  }

  return (
    <>
      <PageBanner
        title={catalogue.title}
        description={catalogue.description}
        breadcrumbs={[{ label: 'Downloads', href: '/downloads/exam-papers' }, { label: catalogue.title }]}
        image={images.pageBanner}
      />

      <Container className="py-12 sm:py-16">
        <nav aria-label="Paper categories" className="flex gap-2 border-b">
          {categoryTabs.map((tab) => (
            <NavLink
              key={tab.category}
              to={tab.href}
              className={({ isActive }) =>
                cn(
                  '-mb-px border-b-4 px-4 py-3 font-display font-semibold transition-colors',
                  isActive
                    ? 'border-secondary text-primary-900'
                    : 'border-transparent text-muted-foreground hover:text-primary-900',
                )
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 grid gap-4 rounded-lg border bg-background-subtle p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
            <Label htmlFor="paper-search">Search</Label>
            <div className="relative">
              <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="paper-search"
                type="search"
                placeholder="e.g. Physics, JEE Main 2026"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="paper-group">{catalogue.groupLabel}</Label>
            <NativeSelect id="paper-group" value={selectedGroup} onChange={(event) => setSelectedGroup(event.target.value)}>
              <option value="">All</option>
              {filterOptions.groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </NativeSelect>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="paper-subject">Subject</Label>
            <NativeSelect id="paper-subject" value={selectedSubject} onChange={(event) => setSelectedSubject(event.target.value)}>
              <option value="">All</option>
              {filterOptions.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </NativeSelect>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="paper-year">Year</Label>
            <NativeSelect id="paper-year" value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)}>
              <option value="">All</option>
              {filterOptions.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </NativeSelect>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-muted-foreground">
            Showing <strong className="text-foreground">{visiblePapers.length}</strong> of {catalogue.papers.length} papers
          </p>
          {hasActiveFilters && (
            <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
              <X />
              Clear filters
            </Button>
          )}
        </div>

        {visiblePapers.length > 0 ? (
          <ul className="mt-4 divide-y overflow-hidden rounded-lg border bg-card shadow-sm">
            {visiblePapers.map((paper) => (
              <li key={paper.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-accent-50 text-accent">
                  <FileText aria-hidden className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold text-primary-900">{paper.title}</p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{paper.group}</span>
                    <span aria-hidden>·</span>
                    <span>{paper.subject}</span>
                    <span aria-hidden>·</span>
                    <span>{paper.year}</span>
                    <span className={cn('rounded-sm px-2 py-0.5 text-xs font-semibold', paperTypeClasses[paper.type])}>
                      {paper.type}
                    </span>
                  </p>
                </div>
                <Button asChild variant="outline" className="shrink-0 self-start sm:self-auto">
                  <a href={paper.fileUrl} download={toFileName(paper.title)}>
                    <Download />
                    Download PDF
                    <span className="sr-only">: {paper.title}</span>
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-lg border border-dashed p-10 text-center">
            <p className="font-display text-lg font-semibold text-primary-900">No papers match your filters</p>
            <Button type="button" variant="link" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}

        <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
          Papers are provided for practice only. Board and entrance examination papers remain the property of CBSE,
          NTA and the respective examining bodies.
        </p>
      </Container>
    </>
  )
}
