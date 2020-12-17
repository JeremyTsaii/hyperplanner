import { Courses } from '../generated/graphql'

export const schools = [
  {
    value: 'hmc',
    label: 'Harvey Mudd College',
  },
]

interface StringToString {
  [input: string]: string
}
export const schoolDict: StringToString = {
  hmc: 'Harvey Mudd College',
  'Harvey Mudd College': 'hmc',
}

export const majors = [
  {
    value: 'bio',
    label: 'Biology',
  },
  {
    value: 'bio_chem',
    label: 'Joint Biology/Chemistry',
  },
  {
    value: 'chem',
    label: 'Chemistry',
  },
  {
    value: 'cs',
    label: 'Computer Science',
  },
  {
    value: 'cs_math',
    label: 'Joint Computer Science/Mathematics',
  },
  {
    value: 'engr',
    label: 'Engineering',
  },
  {
    value: 'math',
    label: 'Mathematics',
  },
  {
    value: 'math_phys',
    label: 'Joint Mathematics/Physics',
  },
  {
    value: 'mcb',
    label: 'Mathematical/Computational Biology',
  },
  {
    value: 'phys',
    label: 'Physics',
  },
]

export const majorDict: StringToString = {
  bio: 'Biology',
  Biology: 'bio',
  bio_chem: 'Joint Biology/Chemistry',
  'Joint Biology/Chemistry': 'bio_chem',
  chem: 'Chemistry',
  Chemistry: 'chem',
  cs: 'Computer Science',
  'Computer Science': 'cs',
  cs_math: 'Joint Computer Science/Mathematics',
  'Joint Computer Science/Mathematics': 'cs_math',
  engr: 'Engineering',
  Engineering: 'engr',
  math: 'Mathematics',
  Mathematics: 'math',
  math_phys: 'Joint Mathematics/Physics',
  'Joint Mathematics/Physics': 'math_phys',
  mcb: 'Mathematical/Computational Biology',
  'Mathematical/Computational Biology': 'mcb',
  phys: 'Physics',
  Physics: 'phys',
}

export const enrollYears = [
  {
    value: 2017,
  },
  {
    value: 2018,
  },
  {
    value: 2019,
  },
  {
    value: 2020,
  },
  {
    value: 2021,
  },
  {
    value: 2022,
  },
]

export const concentrations = [
  {
    value: 'American Studies',
  },
  {
    value: 'Anthropology',
  },
  {
    value: 'Art',
  },
  {
    value: 'Art History',
  },
  {
    value: 'Asian American Studies',
  },
  {
    value: 'Asian Studies',
  },
  {
    value: 'Africana Studies',
  },
  {
    value: 'Chicanx/Latinx Studies',
  },
  {
    value: 'Classics',
  },
  {
    value: 'Dance',
  },
  {
    value: 'Economics',
  },
  {
    value: 'Education',
  },
  {
    value: 'Environmental Analysis',
  },
  {
    value: 'European Studies',
  },
  {
    value: 'Foreign Languages',
  },
  {
    value: 'Gender Studies',
  },
  {
    value: 'Geography',
  },
  {
    value: 'German Studies',
  },
  {
    value: 'History',
  },
  {
    value: 'Holocaust & Human Rights',
  },
  {
    value: 'Jewish Studies',
  },
  {
    value: 'Latin American Studies',
  },
  {
    value: 'Linguistics',
  },
  {
    value: 'Literature',
  },
  {
    value: 'Media Studies',
  },
  {
    value: 'Middle Eastern Studies',
  },
  {
    value: 'Music',
  },
  {
    value: 'Philosophy',
  },
  {
    value: 'Politcal Studies',
  },
  {
    value: 'Psychology',
  },
  {
    value: 'Public Policy Analysis',
  },
  {
    value: 'Religious Studies',
  },
  {
    value: 'Science, Technology, & Society',
  },
  {
    value: 'Secular Studies',
  },
  {
    value: 'Sociology',
  },
  {
    value: 'Theatre',
  },
  {
    value: 'Writing and Rhetoric',
  },
]

export const campuses = [
  {
    value: 'hmc',
    label: 'Harvey Mudd College',
  },
  {
    value: 'sc',
    label: 'Scripps College',
  },
  {
    value: 'po',
    label: 'Pomona College',
  },
  {
    value: 'cmc',
    label: 'Claremont McKenna College',
  },
  {
    value: 'pz',
    label: 'Pitzer College',
  },
  {
    value: 'kgi',
    label: 'Keck Graduate Institute',
  },
  {
    value: 'cgu',
    label: 'Claremont Graduate University',
  },
]

export const campusDict: StringToString = {
  hmc: 'Harvey Mudd College',
  sc: 'Scripps College',
  po: 'Pomona College',
  cmc: 'Claremont McKenna College',
  pz: 'Pitzer College',
  kgi: 'Keck Graduate Institute',
  cgu: 'Claremont Graduate University',
}

export const credits = [
  {
    value: '0.0',
  },
  {
    value: '0.5',
  },
  {
    value: '1.0',
  },
  {
    value: '1.5',
  },
  {
    value: '2.0',
  },
  {
    value: '2.5',
  },
  {
    value: '3.0',
  },
  {
    value: '3.5',
  },
  {
    value: '4.0',
  },
]

export const types = [
  {
    value: 'major_req',
    label: 'Major Requirement',
  },
  {
    value: 'major_elec',
    label: 'Major Elective',
  },
  {
    value: 'core_req',
    label: 'Core Requirement',
  },
  {
    value: 'hum_depth',
    label: 'Humanities Depth',
  },
  {
    value: 'hum_breadth',
    label: 'Humanities Breadth',
  },
  {
    value: 'hum_elec',
    label: 'Humanities Elective',
  },
  {
    value: 'pe',
    label: 'Physical Education',
  },
  {
    value: 'other',
    label: 'Other',
  },
]

export const typeDict: StringToString = {
  major_req: 'Major Requirement',
  major_elec: 'Major Elective',
  core_req: 'Core Requirement',
  hum_depth: 'Humanities Depth',
  hum_breadth: 'Humanities Breadth',
  hum_elec: 'Humanities Elective',
  pe: 'Physical Education',
  other: 'Other',
}

export const bools = [
  {
    value: true,
    label: 'True',
  },
  {
    value: false,
    label: 'False',
  },
]

export type CourseType = {
  __typename?: 'courses' | undefined
} & Pick<
  Courses,
  | 'term'
  | 'title'
  | 'code'
  | 'credits'
  | 'type'
  | 'campus'
  | 'writ_inten'
  | 'active'
>

export const courseSort = (c1: CourseType, c2: CourseType): number => {
  let val = -c1.type.localeCompare(c2.type)
  // Types are equal so compare cdes next
  if (!val) {
    val = c1.code.localeCompare(c2.code)
  }
  return val
}

export const placeholderCourses: CourseType[] = [
  {
    campus: 'cmc',
    code: 'PE056',
    credits: 1.0,
    term: 'fall1',
    title: 'Soccer',
    type: 'pe',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CHEM023',
    credits: 3.0,
    term: 'fall1',
    title: 'Chemistry',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI005',
    credits: 3.0,
    term: 'fall1',
    title: 'Intro to CS',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'MATH030',
    credits: 1.5,
    term: 'fall1',
    title: 'Calculus',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'MATH035',
    credits: 1.5,
    term: 'fall1',
    title: 'Statistics',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'PHYS023',
    credits: 1.5,
    term: 'fall1',
    title: 'Physics',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'WRIT001',
    credits: 1.5,
    term: 'fall1',
    title: 'Writing',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'cmc',
    code: 'PE056',
    credits: 1.0,
    term: 'spring1',
    title: 'Soccer',
    type: 'pe',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI060',
    credits: 3.0,
    term: 'spring1',
    title: 'CS Principles',
    type: 'major_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'BIOL052',
    credits: 3.0,
    term: 'spring1',
    title: 'Biology',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'HSA010',
    credits: 3.0,
    term: 'spring1',
    title: 'Critical Inquiry',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'MATH040',
    credits: 1.5,
    term: 'spring1',
    title: 'Linear Algebra',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'MATH045',
    credits: 1.5,
    term: 'spring1',
    title: 'Differential Equations',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI070',
    credits: 3.0,
    term: 'fall2',
    title: 'Data Structures',
    type: 'major_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'MATH055',
    credits: 3.0,
    term: 'fall2',
    title: 'Discrete Mathematics',
    type: 'major_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'ECON104',
    credits: 3.0,
    term: 'fall2',
    title: 'Financial Economics',
    type: 'hum_depth',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'ENGR079',
    credits: 3.0,
    term: 'fall2',
    title: 'Engineering',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'MATH189',
    credits: 1.0,
    term: 'spring2',
    title: 'Data Analytics',
    type: 'other',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI105',
    credits: 3.0,
    term: 'spring2',
    title: 'Computer Systems',
    type: 'major_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI121',
    credits: 3.0,
    term: 'spring2',
    title: 'Software Development',
    type: 'major_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI189',
    credits: 1.0,
    term: 'spring2',
    title: 'Programming Practicum',
    type: 'major_elec',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'sc',
    code: 'ECON051',
    credits: 3.0,
    term: 'spring2',
    title: 'Macroeconomics',
    type: 'hum_depth',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'po',
    code: 'PSYC051',
    credits: 3.0,
    term: 'spring2',
    title: 'Psychology',
    type: 'hum_breadth',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI140',
    credits: 3.0,
    term: 'fall3',
    title: 'Algorithms',
    type: 'major_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI195',
    credits: 1.0,
    term: 'fall3',
    title: 'Colloquium',
    type: 'major_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI134',
    credits: 3.0,
    term: 'fall3',
    title: 'Operating Systems',
    type: 'major_elec',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI151',
    credits: 3.0,
    term: 'fall3',
    title: 'Artificial Intelligence',
    type: 'major_elec',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'sc',
    code: 'MUS081',
    credits: 3.0,
    term: 'fall3',
    title: 'Intro to Music',
    type: 'hum_breadth',
    writ_inten: false,
    active: true,
  },
]

export const demoColorCourses: CourseType[] = [
  {
    campus: 'hmc',
    code: 'CSCI140',
    credits: 3.0,
    term: 'fall3',
    title: 'Major Requirement',
    type: 'major_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI151',
    credits: 3.0,
    term: 'fall3',
    title: 'Major Elective',
    type: 'major_elec',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'sc',
    code: 'ECON051',
    credits: 3.0,
    term: 'fall1',
    title: 'Humanities Depth',
    type: 'hum_depth',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'sc',
    code: 'MUS081',
    credits: 3.0,
    term: 'fall1',
    title: 'Humanities Breadth',
    type: 'hum_breadth',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'po',
    code: 'PSYC051',
    credits: 3.0,
    term: 'fall1',
    title: 'Humanities Elective',
    type: 'hum_elec',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'CSCI005',
    credits: 3.0,
    term: 'fall1',
    title: 'Core Requirement',
    type: 'core_req',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'cmc',
    code: 'PE056',
    credits: 1.0,
    term: 'fall1',
    title: 'Physical Education/Other',
    type: 'pe',
    writ_inten: false,
    active: true,
  },
]

export const demoInitialsCourses: CourseType[] = [
  {
    campus: 'hmc',
    code: 'ECON104',
    credits: 3.0,
    term: 'fall1',
    title: 'Mudd Humanities',
    type: 'hum_depth',
    writ_inten: false,
    active: true,
  },
  {
    campus: 'po',
    code: 'EA010',
    credits: 3.0,
    term: 'fall1',
    title: 'Writing Intensive',
    type: 'hum_breadth',
    writ_inten: true,
    active: true,
  },
  {
    campus: 'hmc',
    code: 'LIT035',
    credits: 3.0,
    term: 'fall1',
    title: 'Mudd Hum/Writ Int',
    type: 'hum_elec',
    writ_inten: true,
    active: true,
  },
]
