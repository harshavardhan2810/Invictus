export interface FacultyMember {
  id: string
  name: string
  department: string
  /** PGT = Post Graduate Teacher, TGT = Trained Graduate Teacher (CBSE designations) */
  designation: string
  qualification: string
  /** Portrait URL. Cards show a monogram until a photo is provided. */
  image?: string
}

// Placeholder faculty. Add portraits under src/assets/images/faculty/ and
// import them here, or replace this list with an API call later.
export const faculty: FacultyMember[] = [
  {
    id: 'kavitha-reddy',
    name: 'Mrs. Kavitha Reddy',
    department: 'Mathematics',
    designation: 'PGT & Head of Department',
    qualification: 'M.Sc., B.Ed.',
  },
  {
    id: 'srinivas-rao',
    name: 'Mr. Srinivas Rao',
    department: 'Physics',
    designation: 'PGT',
    qualification: 'M.Sc., M.Ed.',
  },
  {
    id: 'farheen-begum',
    name: 'Dr. Farheen Begum',
    department: 'Chemistry',
    designation: 'PGT',
    qualification: 'Ph.D., B.Ed.',
  },
  {
    id: 'rajesh-kumar',
    name: 'Mr. Rajesh Kumar',
    department: 'Biology',
    designation: 'PGT',
    qualification: 'M.Sc., B.Ed.',
  },
  {
    id: 'anjali-deshpande',
    name: 'Mrs. Anjali Deshpande',
    department: 'English',
    designation: 'TGT',
    qualification: 'M.A., B.Ed.',
  },
  {
    id: 'venkatesh-iyer',
    name: 'Mr. Venkatesh Iyer',
    department: 'Computer Science',
    designation: 'PGT',
    qualification: 'M.C.A., B.Ed.',
  },
  {
    id: 'swathi-goud',
    name: 'Mrs. Swathi Goud',
    department: 'Social Science',
    designation: 'TGT',
    qualification: 'M.A., B.Ed.',
  },
  {
    id: 'harpreet-singh',
    name: 'Mr. Harpreet Singh',
    department: 'Physical Education',
    designation: 'Physical Education Teacher',
    qualification: 'M.P.Ed.',
  },
]
