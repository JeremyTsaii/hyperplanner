import React, { createContext, useContext } from 'react'
import Requirements from '../static/requirements.json'
import { UserContext } from './UserContext'
import { CoursesContext } from './CoursesContext'
import { Courses } from '../generated/graphql'

/* eslint-disable  @typescript-eslint/no-explicit-any */

interface ProviderProps {
  children: React.ReactNode
}

type Stats = {
  total: number
  rem: number
  avg: number
  avgRem: any
  pe: number
  majorElec: number
  depth: number
  breadth: number
  humElec: number
  muddHum: number
  writ: number
  majorChecks: number[]
  majorReqTable: { [code: string]: number[] }
  coreChecks: number[]
  coreReqTable: { [code: string]: number[] }
}

const generateUserMajorRequirements = (
  major: string,
  school: string,
): {
  majorReqTable: { [code: string]: number[] }
  count: number
} => {
  const majorReqTable: { [code: string]: number[] } = {}

  const schoolKey = school as keyof typeof Requirements
  const majorKey = major as keyof typeof Requirements[typeof schoolKey]['major']
  const checklist = Requirements[schoolKey].major[majorKey].major_req

  let count = 0
  /* eslint-disable */
  checklist.forEach((req: { code: string; title: string }, index: number) => {
    const currCode = req.code.split('/')
    count += 1
    currCode.forEach((code: string) => {
      if (majorReqTable.hasOwnProperty(code)) {
        majorReqTable[code].push(index)
      } else {
        majorReqTable[code] = [index]
      }
    })
  })
  /* eslint-enable */

  return { majorReqTable, count }
}

const generateUserCoreRequirements = (
  enrollYear: number,
  school: string,
): {
  coreReqTable: { [code: string]: number[] }
  count: number
} => {
  const coreReqTable: { [code: string]: number[] } = {}

  const schoolKey = school as keyof typeof Requirements
  const coreType = enrollYear > 2018 ? 'post' : 'pre'
  const coreTypeKey = coreType as keyof typeof Requirements[typeof schoolKey]['core']
  const checklist = Requirements[schoolKey].core[coreTypeKey].courses

  let count = 0
  /* eslint-disable */
  checklist.forEach((req: { code: string; title: string }, index: number) => {
    const currCode = req.code.split('/')
    count += 1
    currCode.forEach((code: string) => {
      if (coreReqTable.hasOwnProperty(code)) {
        coreReqTable[code].push(index)
      } else {
        coreReqTable[code] = [index]
      }
    })
  })
  /* eslint-enable */

  return { coreReqTable, count }
}

// Aggregate function that calculates multipate statistics to prevent looping through courses multiple times
const getCourseStats = (
  courseArr: Courses[],
  majorReqTable: { [code: string]: number[] },
  coreReqTable: { [code: string]: number[] },
  majorCount: number,
  coreCount: number,
): {
  pe: number
  majorElec: number
  depth: number
  breadth: number
  humElec: number
  muddHum: number
  writ: number
  semesters: number
  majorChecks: number[]
  coreChecks: number[]
} => {
  // Counters for stats
  let pe = 0
  let majorElec = 0
  let depth = 0
  let breadth = 0
  let humElec = 0
  let muddHum = 0
  let writ = 0

  const majorChecks: number[] = Array(majorCount).fill(0)
  const coreChecks: number[] = Array(coreCount).fill(0)
  // Find number of completed semesters for average calculations
  // Looks at greatest semester that is not a summer
  let num = 0
  let sem = 'fall'
  courseArr.forEach((course) => {
    if (course.active) {
      if (course.writ_inten) {
        writ += 1
      }

      if (course.type === 'pe') {
        pe += course.credits
      } else if (course.type === 'major_elec') {
        majorElec += course.credits
      } else if (course.type === 'hum_depth') {
        depth += 1
        if (course.campus === 'hmc') {
          muddHum += 1
        }
      } else if (course.type === 'hum_breadth') {
        breadth += 1
        if (course.campus === 'hmc') {
          muddHum += 1
        }
      } else if (course.type === 'hum_elec') {
        humElec += 1
        if (course.campus === 'hmc') {
          muddHum += 1
        }
      }

      const lastChar = course.term.slice(-1)
      const lastSem = course.term.slice(0, -1)
      const numLast = parseInt(lastChar, 10)

      if (
        (numLast > num || (numLast === num && sem === 'fall')) &&
        lastSem !== 'summer'
      ) {
        sem = lastSem
        num = numLast
      }
    }

    const pattern = /[\D]*/
    /* eslint-disable */
    const dept = course.code.match(pattern)![0] as string
    // Handle major/core checks array
    if (majorReqTable.hasOwnProperty(course.code)) {
      majorChecks[majorReqTable[course.code].shift() as number] = course.active
        ? 2
        : 1
    } else if (
      majorReqTable.hasOwnProperty(dept) &&
      course.credits === 3 &&
      course.type === 'major_req'
    ) {
      majorChecks[majorReqTable[dept].shift() as number] = course.active ? 2 : 1
    }
    if (coreReqTable.hasOwnProperty(course.code)) {
      coreChecks[coreReqTable[course.code].shift() as number] = course.active
        ? 2
        : 1
    }
    /* eslint-enable */
  })
  num = num * 2 - (sem === 'fall' ? 1 : 0)

  // -1 Edge case where no courses added yet
  num = num === -1 ? 0 : num

  return {
    semesters: num,
    pe,
    majorElec,
    depth,
    breadth,
    humElec,
    muddHum,
    writ,
    majorChecks,
    coreChecks,
  }
}

// Calculate stats needed for graduation, major, humanities, and core requirements
// Graduation: total credits, credits remaining, average credits per semester, remaining average credits, pe
// Major: electives
// Humanities: depth, breadth, electives, mudd hums, writing intensives
// NOTE: Major electives in number of credits while depth, breadth, hum electives,
// mudd hums, and writing intensives in number of courses
const calculateStats = (
  school: string,
  courses: Courses[],
  major: string,
  enrollYear: number,
  plannedGrad: string,
): Stats => {
  const statsObj = {} as Stats
  const key = school as keyof typeof Requirements

  // Credit calculation
  const requiredCredits = Requirements[key].grad
  const totalCredits = courses.reduce(
    (count: number, course: Courses) =>
      course.active ? count + course.credits : count,
    0,
  )

  const { majorReqTable, count: majorCount } = generateUserMajorRequirements(
    major,
    school,
  )
  const { coreReqTable, count: coreCount } = generateUserCoreRequirements(
    enrollYear,
    school,
  )

  const {
    semesters,
    pe,
    majorElec,
    depth,
    breadth,
    humElec,
    muddHum,
    writ,
    majorChecks,
    coreChecks,
  } = getCourseStats(
    courses,
    majorReqTable,
    coreReqTable,
    majorCount,
    coreCount,
  )

  // Calculate how many semesters the user plans on graduating in
  const plan = plannedGrad.split(' ', 2)
  const totalSemesters =
    2 * (parseFloat(plan[1]) - enrollYear) + (plan[0] === 'Fall' ? 1 : 0)
  statsObj.total = totalCredits

  // Set minimum remaining credits to 0
  statsObj.rem =
    totalCredits > requiredCredits ? 0 : requiredCredits - totalCredits

  // Logic for deciding the average remaining credits
  if (totalSemesters <= semesters && statsObj.rem > 0) {
    // If user still has remaining credits within time to graduate
    statsObj.avgRem = 'Infinity - Not Possible'
  } else if (totalSemesters < semesters && statsObj.rem === 0) {
    // Will graduate after planned semester
    statsObj.avgRem = `Graduating After ${plannedGrad}`
  } else if (statsObj.rem === 0) {
    // Enough credits to graduate within planned semester
    statsObj.avgRem = 0
  } else {
    // Calculate average remaining credits
    statsObj.avgRem = Number(
      (statsObj.rem / (totalSemesters - semesters)).toFixed(2),
    )
  }

  statsObj.avg = Number(
    (totalCredits / (semesters === 0 ? 1 : semesters)).toFixed(2),
  )
  statsObj.pe = pe
  statsObj.majorElec = majorElec
  statsObj.depth = depth
  statsObj.breadth = breadth
  statsObj.humElec = humElec
  statsObj.muddHum = muddHum
  statsObj.writ = writ
  statsObj.majorChecks = majorChecks
  statsObj.majorReqTable = majorReqTable
  statsObj.coreChecks = coreChecks
  statsObj.coreReqTable = coreReqTable

  return statsObj
}

// eslint-disable-next-line
export const StatsContext = createContext({} as any)

export const StatsContextProvider = ({
  children,
}: ProviderProps): JSX.Element => {
  const user = useContext(UserContext)
  const userCourses = useContext(CoursesContext)

  // Wait until contexts are finished loading
  if (user.loading || user.error || userCourses.loading || userCourses.error) {
    return <StatsContext.Provider value={{}}>{children}</StatsContext.Provider>
  }

  const info = user.data.users[0]
  const { courses } = userCourses.data

  // Calculate statistics
  const stats = calculateStats(
    info.school,
    courses,
    info.major,
    info.enroll,
    info.planned_grad,
  )

  return <StatsContext.Provider value={stats}>{children}</StatsContext.Provider>
}
