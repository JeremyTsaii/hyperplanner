import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import RightStatsCardStats from './RightStatsCardStats'
import RightStatsCardProgress from './RightStatsCardProgress'
import Requirements from '../static/requirements.json'
import { UserContext } from '../context/UserContext'
import { CoursesContext } from '../context/CoursesContext'
import { Courses } from '../generated/graphql'

const useStyles = makeStyles((theme) => ({
  statsCard: {
    background: '#23252e',
    height: theme.spacing(25),
    flexGrow: 4,
    flexDirection: 'row',
    display: 'flex',
    boxSizing: 'border-box',
    marginLeft: theme.spacing(1),
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      marginTop: theme.spacing(3),
    },
  },
  reqButtonSection: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '150px',
    width: '150px',
    margin: '0px',
    marginTop: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2),
    },
  },
  statButton: {
    marginBottom: theme.spacing(1),
    height: theme.spacing(4),
    textAlign: 'left',
    color: 'white',
  },
  tab: {
    backgroundColor: '#23252e',
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
  },
  indicator: {
    left: '0px',
  },
}))
/* eslint-disable  @typescript-eslint/no-explicit-any */
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

interface statsProps {
  ELEV: number
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

// Check if each course in user's major/core checks is active
const checkActiveRequirements = (
  type: string,
  checksArr: number[],
  checklist: { code: string; title: string }[],
  courses: Courses[],
): number[] => {
  const userCourses = courses.filter((course) => course.type === type)
  const activeCourses: { [code: string]: number } = {}

  // Count # of active courses for each code
  userCourses.forEach((course: Courses) => {
    const currCode = course.code
    if (course.active) {
      if (currCode in activeCourses) {
        activeCourses[currCode] += 1
      } else {
        activeCourses[currCode] = 1
      }
    }
  })

  return checksArr.map((c: number, i: number) => {
    // Split for edge case of CSCI060/CSCI042
    const courseCodes = checklist[i].code.split('/')

    let val = 0
    courseCodes.forEach((courseCode) => {
      if (c === 1 && courseCode in activeCourses) {
        if (activeCourses[courseCode] > 0) {
          activeCourses[courseCode] -= 1
          val = 1
        }
      }
    })
    return val
  })
}

// Calculate percentage of checked courses in array of requirements
const calculatePercentageChecked = (arr: number[]): number => {
  // Calculate percentage checked
  const len = arr.length
  const checked = arr.reduce((a, b) => a + b, 0)

  return (checked / len) * 100
}

// Don't let percentages over 100
const capPercentage = (val: number): number => {
  return val > 100 ? 100 : val
}

function RightStatsCard({ ELEV }: statsProps): JSX.Element {
  const classes = useStyles()
  const [value, setValue] = useState('grad')

  const { data: infoData } = useContext(UserContext)
  const { data: coursesData } = useContext(CoursesContext)

  const info = infoData.users[0]
  const { courses } = coursesData

  const {
    school,
    major,
    majorChecks,
    coreChecks,
    enroll,
    planned_grad: plannedGrad,
  } = info

  const stats = calculateStats(info.school, courses, enroll, plannedGrad)

  const {
    total: totalCredits,
    rem: creditsRem,
    avg: avgCredits,
    avgRem,
    pe,
    majorElec,
    depth,
    breadth,
    humElec,
    muddHum,
    writ,
  } = stats

  /* eslint-disable-next-line */
  const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
    setValue(value)
  }

  let dynamicStatsComponent = {}
  let dynamicProgressComponent = {}

  const schoolKey = school as keyof typeof Requirements
  const majorKey = major as keyof typeof Requirements[typeof schoolKey]['major']

  const jsonMajorChecks = JSON.parse(majorChecks)
  const jsonCoreChecks = JSON.parse(coreChecks)

  if (value === 'grad') {
    const titleArr = [
      'Total Credits:',
      'Credits Remaining:',
      'Average Credits per Semester:',
      'Remaining Average Credits:',
    ]
    const valArr = [totalCredits, creditsRem, avgCredits, avgRem]
    const progressTitleArr = ['Credits', 'PE']
    const totalRequired = Requirements[schoolKey].grad
    const peRequired = Requirements[schoolKey].pe
    const progressValArr = [
      capPercentage((totalCredits / totalRequired) * 100),
      capPercentage((pe / peRequired) * 100),
    ]

    dynamicStatsComponent = (
      <RightStatsCardStats titleArr={titleArr} valArr={valArr} isList={false} />
    )
    dynamicProgressComponent = (
      <RightStatsCardProgress
        progressTitleArr={progressTitleArr}
        progressValArr={progressValArr}
      />
    )
  } else if (value === 'major') {
    const checklist = Requirements[schoolKey].major[majorKey].major_req
    const majorElecRequired = Requirements[schoolKey].major[majorKey].major_elec
    const majorKey2 = major as keyof typeof jsonMajorChecks
    const majorChecksArr = jsonMajorChecks[majorKey2]
    const activeMajorChecksArr = checkActiveRequirements(
      'major_req',
      majorChecksArr,
      checklist,
      courses,
    )
    const progressTitleArr = ['Completed', 'Electives']
    const progressValArr = [
      calculatePercentageChecked(activeMajorChecksArr),
      capPercentage((majorElec / majorElecRequired) * 100),
    ]

    dynamicStatsComponent = (
      <RightStatsCardStats
        isMajor
        isList
        checklist={checklist}
        major={major}
        majorChecks={majorChecks}
        activeMajorChecksArr={activeMajorChecksArr}
      />
    )
    dynamicProgressComponent = (
      <RightStatsCardProgress
        progressTitleArr={progressTitleArr}
        progressValArr={progressValArr}
      />
    )
  } else if (value === 'core') {
    let coreTypeKey = 'pre' as keyof typeof Requirements[typeof schoolKey]['core']
    let coreTypeKey2 = 'pre' as keyof typeof jsonCoreChecks
    if (enroll > 2018) {
      coreTypeKey = 'post' as keyof typeof Requirements[typeof schoolKey]['core']
      coreTypeKey2 = 'post' as keyof typeof jsonCoreChecks
    }
    const checklist = Requirements[schoolKey].core[coreTypeKey].courses
    const coreChecksArr = jsonCoreChecks[coreTypeKey2]
    const activeCoreChecksArr = checkActiveRequirements(
      'core_req',
      coreChecksArr,
      checklist,
      courses,
    )
    const progressTitleArr = ['Completed']
    const progressValArr = [calculatePercentageChecked(activeCoreChecksArr)]

    dynamicStatsComponent = (
      <RightStatsCardStats
        isMajor={false}
        isList
        checklist={checklist}
        enroll={enroll}
        coreChecks={coreChecks}
        activeCoreChecksArr={activeCoreChecksArr}
      />
    )
    dynamicProgressComponent = (
      <RightStatsCardProgress
        progressTitleArr={progressTitleArr}
        progressValArr={progressValArr}
      />
    )
  } else if (value === 'hum') {
    const depthRequired = Requirements[schoolKey].hum.hum_depth
    const breadthRequired = Requirements[schoolKey].hum.hum_breadth
    const elecRequired = Requirements[schoolKey].hum.hum_elec
    const muddRequired = Requirements[schoolKey].hum.mudd_hum
    const writRequired = Requirements[schoolKey].hum.writ_inten

    const titleArr = [
      'Humanities Depth:',
      'Humanities Breadth:',
      'Humanities Electives:',
      'Mudd Hums:',
      'Writing Intensive:',
    ]
    const valArr = [depth, breadth, humElec, muddHum, writ]
    const progressTitleArr = [
      'Depth',
      'Breadth',
      'Electives',
      'Mudd Hums',
      'Writing',
    ]
    const progressValArr = [
      capPercentage((depth / depthRequired) * 100),
      capPercentage((breadth / breadthRequired) * 100),
      capPercentage((humElec / elecRequired) * 100),
      capPercentage((muddHum / muddRequired) * 100),
      capPercentage((writ / writRequired) * 100),
    ]

    dynamicStatsComponent = (
      <RightStatsCardStats titleArr={titleArr} valArr={valArr} isList={false} />
    )
    dynamicProgressComponent = (
      <RightStatsCardProgress
        progressTitleArr={progressTitleArr}
        progressValArr={progressValArr}
      />
    )
  }

  return (
    <Grid item>
      <Paper elevation={ELEV} className={classes.statsCard}>
        {dynamicStatsComponent}
        {dynamicProgressComponent}
        <div className={classes.reqButtonSection}>
          <Tabs
            classes={{
              indicator: classes.indicator,
            }}
            orientation="vertical"
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="simple tabs example"
            variant="fullWidth">
            <Tab label="Graduation" value="grad" className={classes.tab} />
            <Tab label="Major" value="major" className={classes.tab} />
            <Tab label="Humanities" value="hum" className={classes.tab} />
            <Tab label="Core" value="core" className={classes.tab} />
          </Tabs>
        </div>
      </Paper>
    </Grid>
  )
}

export default RightStatsCard
