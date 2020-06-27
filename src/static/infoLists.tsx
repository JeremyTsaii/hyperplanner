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

export const gradYears = [
  {
    value: 2021,
  },
  {
    value: 2022,
  },
  {
    value: 2023,
  },
  {
    value: 2024,
  },
  {
    value: 2025,
  },
  {
    value: 2026,
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
]

export const campusDict: StringToString = {
  hmc: 'Harvey Mudd College',
  sc: 'Scripps College',
  po: 'Pomona College',
  cmc: 'Claremont McKenna College',
  pz: 'Pitzer College',
}

export const credits = [
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
