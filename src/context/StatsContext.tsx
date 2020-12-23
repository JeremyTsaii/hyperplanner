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
}

// Aggregate function that calculates multipate statistics to prevent looping through courses multiple times
const getCourseStats = (
  courseArr: Courses[],
): {
  pe: number
  majorElec: number
  depth: number
  breadth: number
  humElec: number
  muddHum: number
  writ: number
  semesters: number
} => {
  // Counters for stats
  let pe = 0
  let majorElec = 0
  let depth = 0
  let breadth = 0
  let humElec = 0
  let muddHum = 0
  let writ = 0

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

  const {
    semesters,
    pe,
    majorElec,
    depth,
    breadth,
    humElec,
    muddHum,
    writ,
  } = getCourseStats(courses)

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
    info.enroll,
    info.planned_grad,
  )

  return <StatsContext.Provider value={stats}>{children}</StatsContext.Provider>
}
