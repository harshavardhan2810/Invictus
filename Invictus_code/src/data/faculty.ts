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
    id: 'rohit-sharma',
    name: 'Rohit Sharma',
    department: 'Mathematics',
    designation: 'Senior Faculty & Head of Department',
    qualification: 'M.Sc., B.Ed.',
  },
  {
    id: 'virat-kohli',
    name: 'Virat Kohli',
    department: 'Physics',
    designation: 'Senior Faculty',
    qualification: 'M.Sc., B.Ed.',
  },
  {
    id: 'smriti-mandhana',
    name: 'Smriti Mandhana',
    department: 'Chemistry',
    designation: 'Senior Faculty',
    qualification: 'M.Sc., B.Ed.',
  },
  {
    id: 'jasprit-bumrah',
    name: 'Jasprit Bumrah',
    department: 'Mathematics',
    designation: 'JEE Faculty',
    qualification: 'M.Sc., B.Ed.',
  },
  {
    id: 'harmannpreet-kaur',
    name: 'Harmanpreet Kaur',
    department: 'English',
    designation: 'Senior Faculty',
    qualification: 'M.A., B.Ed.',
  },
  {
    id: 'ravindra-jadeja',
    name: 'Ravindra Jadeja',
    department: 'Physics',
    designation: 'JEE Faculty',
    qualification: 'M.Sc., B.Ed.',
  },
  {
    id: 'shafali-verma',
    name: 'Shafali Verma',
    department: 'Chemistry',
    designation: 'Faculty',
    qualification: 'M.Sc., B.Ed.',
  },
  {
    id: 'rahul-dravid',
    name: 'Rahul Dravid',
    department: 'Student Development',
    designation: 'Academic Mentor',
    qualification: 'M.A., B.Ed.',
  },
]
