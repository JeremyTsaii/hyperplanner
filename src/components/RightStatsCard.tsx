import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
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
    paddingTop: theme.spacing(3),
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
}))

type Stats = {
  total: number
  rem: number
  avg: number
  avgRem: number
  pe: number
  majorElec: number
  depth: number
  breadth: number
  humElec: number
  muddHum: number
  writ: number
}

// Calculate stats needed for graduation, major, humanities, and core requirements
// Graduation: total credits, credits remaining, average credits per semester, remaining average credits, pe
// Major: electives
// Humanities: depth, breadth, electives, mudd hums, writing intensives
// NOTE: Major electives in number of credits while depth, breadth, hum electives,
// mudd hums, and writing intensives in number of courses
const calculateStats = (school: string, courses: Courses[]): Stats => {
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

  const statsObj = {} as Stats
  const key = school as keyof typeof Requirements
  const requiredCredits = Requirements[key].grad
  const totalCredits = courses.reduce(
    (count: number, course: Courses) => count + course.credits,
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

  statsObj.total = totalCredits
  statsObj.rem = requiredCredits - totalCredits
  statsObj.avg = Number(
    (totalCredits / (semesters === 0 ? 1 : semesters)).toFixed(2),
  )
  statsObj.avgRem = Number((statsObj.rem / (8 - semesters)).toFixed(2))
  statsObj.pe = pe
  statsObj.majorElec = majorElec
  statsObj.depth = depth
  statsObj.breadth = breadth
  statsObj.humElec = humElec
  statsObj.muddHum = muddHum
  statsObj.writ = writ

  return statsObj
}

interface statsProps {
  ELEV: number
}

function RightStatsCard({ ELEV }: statsProps): JSX.Element {
  const classes = useStyles()
  const [value, setValue] = useState('grad')

  const { data: infoData } = useContext(UserContext)
  const { data: coursesData } = useContext(CoursesContext)

  const info = infoData.users[0]
  const { courses } = coursesData
  const stats = calculateStats(info.school, courses)

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

  const {
    school,
    grad_year: gradYear,
    major,
    auth0_id: id,
    majorChecks,
    coreChecks,
  } = info

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const calculatePercentageChecked = (arr: number[]): number => {
    // Calculate percentage checked
    let len = 0
    let checked = 0
    arr.forEach((num: number) => {
      len += 1
      if (num) {
        checked += 1
      }
    })

    return (checked / len) * 100
  }

  const capPercentage = (val: number): number => {
    return val > 100 ? 100 : val
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

    const progressTitleArr = ['Completed', 'Electives']
    const progressValArr = [
      calculatePercentageChecked(majorChecksArr),
      capPercentage((majorElec / majorElecRequired) * 100),
    ]

    dynamicStatsComponent = (
      <RightStatsCardStats
        isMajor
        isList
        checklist={checklist}
        id={id}
        major={major}
        majorChecks={majorChecks}
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
    if (gradYear > 2022) {
      coreTypeKey = 'post' as keyof typeof Requirements[typeof schoolKey]['core']
      coreTypeKey2 = 'post' as keyof typeof jsonCoreChecks
    }
    const checklist = Requirements[schoolKey].core[coreTypeKey].courses
    const coreChecksArr = jsonCoreChecks[coreTypeKey2]
    const progressTitleArr = ['Completed']
    const progressValArr = [calculatePercentageChecked(coreChecksArr)]

    dynamicStatsComponent = (
      <RightStatsCardStats
        isMajor={false}
        isList
        checklist={checklist}
        id={id}
        gradYear={gradYear}
        coreChecks={coreChecks}
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
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="req"
              name="req1"
              value={value}
              onChange={handleChange}>
              <FormControlLabel
                value="grad"
                control={<Radio color="primary" />}
                label="Graduation"
                className={classes.statButton}
              />
              <FormControlLabel
                value="major"
                control={<Radio color="primary" />}
                label="Major"
                className={classes.statButton}
              />
              <FormControlLabel
                value="hum"
                control={<Radio color="primary" />}
                label="Humanities"
                className={classes.statButton}
              />
              <FormControlLabel
                value="core"
                control={<Radio color="primary" />}
                label="Core"
                className={classes.statButton}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </Paper>
    </Grid>
  )
}

export default RightStatsCard
