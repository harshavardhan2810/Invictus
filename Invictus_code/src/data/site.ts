export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'x' | 'whatsapp'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  href: string
}

export interface ExternalLink {
  label: string
  href: string
}

// Placeholder details — replace with Invictus's real information before launch.
// Affiliation numbers are left as XXXXXXX deliberately so they can't be mistaken
// for another school's real CBSE registration.
export const siteConfig = {
  name: 'Invictus',
  fullName: 'Invictus IIT Academy',
  descriptor: 'Intermediate College & IIT Academy',
  motto: { text: 'Learn • Prepare • Succeed' },
  establishedYear: 2026,
  tagline:
    'Building strong foundations, preparing students for competitive examinations and shaping successful futures.',
  affiliation: {
    board: 'TGBIE, Hyderabad',
    affiliationNumber: 'XXXXXXX',
    collegeCode: 'XXXXX',
  },
  academicYear: '2027–28',
  admissionsNotice: 'Admissions open for 2027–28 · Intermediate & IIT-JEE Programmes',
  contact: {
    address:
      'Plot No. 12, Hitech City Road, Madhapur, Hyderabad, Telangana 500081',
    phone: '+91 12345 67890',
    phoneHref: 'tel:+911234567890',
    whatsappHref: `https://wa.me/911234567890?text=${encodeURIComponent(
      'Hello Invictus, I would like to know more about admissions for 2027–28.',
    )}`,
    email: 'info@invictus.example',
    admissionsEmail: 'admissions@invictus.example',
    officeHours: 'Mon – Sat, 8:30 AM – 4:30 PM',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Madhapur%2C+Hyderabad',
    enquiryUS: 'Enquire US',
  },
  socialLinks: [
    { platform: 'facebook', label: 'Facebook', href: '#' },
    { platform: 'instagram', label: 'Instagram', href: '#' },
    { platform: 'youtube', label: 'YouTube', href: '#' },
    { platform: 'linkedin', label: 'LinkedIn', href: '#' },
    { platform: 'x', label: 'X', href: '#' },
  ] satisfies SocialLink[],
  importantLinks: [
    { label: 'TGBIE', href: 'https://tgbienew.cgg.gov.in/home.do' },
    { label: 'JEE Main (NTA)', href: 'https://jeemain.nta.nic.in' },
    { label: 'JEE Advanced', href: 'https://jeeadv.ac.in' },
    { label: 'DigiLocker', href: 'https://www.digilocker.gov.in' },
  ] satisfies ExternalLink[],
}
