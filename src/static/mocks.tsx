import { actualCourses } from './infoLists'

// Used for Auth0 hook
export const mockAuthUser = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
}

// Used for UserContext
export const mockUser = {
  auth0_id: 'google-oauth2|2147627834623744883746',
  concentration: 'Economics',
  enroll: 2018,
  major: 'cs',
  nickname: 'Jeremy',
  planned_grad: 'Spring 2022',
  school: 'hmc',
  __typename: 'users',
}

export const mockUserContext = {
  loading: false,
  error: undefined,
  data: {
    users: [mockUser],
  },
}

export const mockCoursesContext = {
  loading: false,
  error: undefined,
  data: {
    courses: actualCourses,
  },
}

export const mockStatsContext = {
  avg: 16.14,
  avgRem: 12,
  breadth: 4,
  coreChecks: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  coreReqTable: {
    BIOL023: [],
    BIOL052: [],
    CHEM023A: [],
    CHEM023B: [],
    CHEM024: [],
    CSCI005: [],
    CSCI042: [5],
    ENGR079: [],
    HSA010: [],
    MATH030B: [8],
    MATH030G: [],
    MATH035: [],
    MATH040: [],
    MATH045: [],
    MATH060: [],
    MATH065: [],
    PHYS023: [],
    PHYS024: [],
    PHYS050: [],
    PHYS051: [],
    WRIT001: [],
  },
  depth: 3,
  humElec: 2,
  majorChecks: [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2],
  majorElec: 15.5,
  majorReqTable: {
    CSCI042: [0],
    CSCI060: [],
    CSCI070: [],
    CSCI081: [],
    CSCI105: [],
    CSCI121: [],
    CSCI131: [],
    CSCI140: [],
    CSCI183: [],
    CSCI184: [],
    CSCI195: [],
    MATH055: [],
  },
  muddHum: 4,
  pe: 3,
  rem: 12,
  total: 113,
  writ: 1,
}
