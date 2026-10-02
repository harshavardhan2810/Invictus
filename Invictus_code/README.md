# Invictus Senior Secondary School — Website

Public website for Invictus, a CBSE school in Hyderabad (Classes 8–12), built with React 19,
Vite, TypeScript, Tailwind CSS v4, shadcn/ui, React Router, React Hook Form + Zod and Axios.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run lint
```

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` once a backend exists.

## Pages

| Route | Page | Status |
| --- | --- | --- |
| `/` | Home — carousel, notice board, events, programs, achievers, activities, faculty | Built |
| `/programs`, `/programs/class-8` … `class-12` | Programs overview and one page per class | Built |
| `/admissions` | Admission procedure, eligibility, documents, dates | Built |
| `/admissions/apply` | Online admission form (validated; demo submit until an API exists) | Built |
| `/downloads/exam-papers`, `/downloads/competitive-papers` | Filterable paper downloads | Built |
| `/activities`, `/activities/:slug` | Seminars, sports, cultural, science club, NCC | Built |
| `/adminlogin`, `/admin/admissions` | Admin login and admission requests dashboard (not linked from the site) | Built (demo auth) |
| `/admissions/fees`, `/downloads/syllabus`, `/gallery` | — | Coming soon |

## Templates

Three complete designs share the same content and inner pages:

| Template | Look | Code |
| --- | --- | --- |
| **Classic** | Navy + saffron, Poppins/Hind, full-width slider, coloured tiles | `components/Header`, `components/Footer`, `pages/Home` |
| **Heritage** | Maroon + temple gold on ivory, Playfair Display/Mukta, mandalas, arch-framed photos | `src/templates/heritage/` |
| **Minimal** | Slate + emerald, DM Sans/Inter, plain menu, text-led hero, bento grid, list sections, plain inner-page headers | `src/templates/minimal/` |

- The floating **Templates** button switches design instantly; the choice is saved in the browser.
  Share a preview with `?template=classic`, `?template=heritage` or `?template=minimal`.
- Each template defines its palette in `src/styles/colors.ts` (same token names) and its fonts in
  `src/templates/templates.ts`. Tailwind utilities resolve to CSS variables (`bg-primary` →
  `var(--brand-primary)`), which `applyTemplate()` fills before the first render.
- A template supplies its own Header, Footer and Home (`src/templates/templateLayouts.ts`); every
  other page is shared and recolours automatically. To add another template: add a palette, an entry
  in `templates.ts`, and its layout components.
- Once a design is chosen, set `DEFAULT_TEMPLATE_ID` and remove `<TemplateSwitcher />` from `PublicLayout`.

## Site-wide features

- **Announcement popup** — `src/data/announcements.ts`. The highest-priority active announcement
  opens shortly after page load (types: campus, exam, result, admission, general). It shows once per
  browser session; "Don’t show this again" hides it for good. Give a new announcement a new `id`.
- **WhatsApp button** — floats bottom-left on every public page; number and greeting are in `data/site.ts`.
- **Admissions storage** — without `VITE_API_BASE_URL`, submitted applications are saved in the
  browser’s localStorage (`api/localAdmissionStore.ts`) and appear in the admin panel on the same device.
  With an API configured, `api/admissions.ts` switches to HTTP calls automatically.
- **Admin panel** — not linked anywhere on the public site; staff open `/adminlogin` directly
  (path set in `src/auth/adminRoutes.ts`). Admins can search, filter, view, change status, delete and
  export applications to CSV. Demo login: `admin` / `Invictus@2027`
  (override with `VITE_ADMIN_USERNAME` / `VITE_ADMIN_PASSWORD`).

> ⚠️ The admin login is a front-end demo only: credentials ship in the JavaScript bundle and
> localStorage is per-browser and unencrypted. Before real use, move login and application storage
> to a backend that authenticates admins and enforces access on every admissions endpoint.

Inner pages are code-split (`lazy` routes in `src/router.tsx`); only Home ships in the main bundle.

## Project structure

```text
src/
├── api/               Backend calls: endpoints, admissions, papers, faculty, contact, errors
├── assets/images/     Placeholder photos + index.ts (swap files here for real imagery)
├── components/
│   ├── ui/            shadcn/ui primitives (button, sheet, carousel, navigation-menu, inputs)
│   ├── common/        Container, SectionHeading, Logo, PageBanner, DateBadge, JaaliPattern, …
│   ├── forms/         FormField / FormSection wrappers for accessible forms
│   ├── Header/  Navigation/  Hero/  Home/  Programs/  Activities/  Faculty/  CTA/  Footer/
├── data/              All content: site config, navigation, home, programs, papers, activities, admissions
├── layouts/           PublicLayout (header, footer, mobile call/apply bar)
├── lib/               axios.ts, format.ts (Indian number/₹/date formats), utils.ts
├── pages/             One folder per page
├── styles/            colors.ts (brand palette), globals.css
└── router.tsx         Route table
```

## Conventions

- **Colours** live only in `src/styles/colors.ts` (navy, saffron, maroon, India green).
  `tailwind.config.ts` feeds them into Tailwind — use `bg-primary`, `text-secondary-700`, `bg-india-green`, etc.
- **Content** lives in `src/data/`. Menus are generated from `programs.ts` and `activities.ts`,
  so adding a class or activity there adds its page and menu entry automatically.
- **Indian formats**: use `formatIndianNumber` (12,50,000), `formatRupees` (₹25,00,000) and
  `formatIndianDate` (18 Oct 2026) from `src/lib/format.ts`.
- **Placeholders to replace before launch**: CBSE affiliation number / school code (`XXXXXXX`
  in `data/site.ts`), contact details, achievers, notices, faculty, and the photos listed in
  `src/assets/images/CREDITS.md`.
- **Papers**: every listing in `data/papers.ts` points to `public/papers/sample-question-paper.pdf`.
  Put real PDFs in `public/papers/` and update each `fileUrl`, or serve them from the API (`api/papers.ts`).
- **shadcn/ui**: `components.json` is configured, so `npx shadcn@latest add <component>` works.

## API layer

`src/api/` holds one module per backend resource; each uses the shared `apiClient`.
The admission form already calls `submitAdmissionApplication` when `VITE_API_BASE_URL` is set;
without it the form runs in demo mode and says so on the confirmation screen. Endpoint paths
(`endpoints.ts`) and the error shape (`errors.ts`) are assumptions — align them with the backend.

## Future portal

The student/faculty/admin portal should be a separate route branch (e.g. `/portal`) with its
own layout and auth guard, leaving `PublicLayout` and the public pages unchanged.
