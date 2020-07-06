import React from 'react'
import Grid from '@material-ui/core/Grid'
import {
  makeStyles,
  responsiveFontSizes,
  createMuiTheme,
} from '@material-ui/core/styles'
import ReactLoading from 'react-loading'
import { useQuery } from '@apollo/react-hooks'
import LeftInfoCard from './LeftInfoCard'
import RightStatsCard from './RightStatsCard'
import { schoolDict, majorDict } from '../static/infoLists'
import { GET_INFO_QUERY, GET_COURSES_QUERY } from '../utils/gqlQueries'
import Requirements from '../static/requirements.json'
import { Courses } from '../generated/graphql'

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

let theme = createMuiTheme({
  typography: {
    fontSize: 10,
  },
})

theme = responsiveFontSizes(theme)

// Page elevation constant
const ELEV = 12

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      flexWrap: 'wrap',
    },
  },
  loadingStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
  loginText: {
    color: '#f50057',
    fontSize: '30px',
  },
}))

// Calculate stats needed for graduation, major, humanities, and core requirements
// Graduation: total credits, credits remaining, average credits per semester, remaining average credits, pe
// Major: electives
// Humanities: depth, breadth, electives, mudd hums, writing intensives
// NOTE: Major electives in credits while depth, breadth, hum electgives, mudd hums, and writing intensives in courses
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
  statsObj.avg = Number((totalCredits / semesters).toFixed(2))
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

function InfoCards(): JSX.Element {
  const classes = useStyles()

  const { loading: infoLoading, error: infoError, data: infoData } = useQuery(
    GET_INFO_QUERY,
  )
  const {
    loading: coursesLoading,
    error: coursesError,
    data: coursesData,
  } = useQuery(GET_COURSES_QUERY)

  if (infoLoading || coursesLoading) {
    return (
      <div className={classes.loadingStyle}>
        <ReactLoading type="cylon" color="#f50057" height="2%" width="2%" />
      </div>
    )
  }

  if (infoError || coursesError) {
    return (
      <div className={classes.loginText}>Please log in & enable pop-ups!</div>
    )
  }

  const info = infoData.users[0]
  const { courses } = coursesData
  const stats = calculateStats(info.school, courses)

  return (
    <Grid
      container
      className={classes.container}
      direction="row"
      justify="space-between">
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <LeftInfoCard
          firstName={info.nickname}
          schoolName={schoolDict[info.school]}
          majorName={majorDict[info.major]}
          concName={info.concentration}
          gradYear={info.grad_year}
          id={info.auth0_id}
          ELEV={ELEV}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
        <RightStatsCard
          totalCredits={stats.total}
          creditsRem={stats.rem}
          avgCredits={stats.avg}
          avgRem={stats.avgRem}
          setting="grad"
          school={info.school}
          gradYear={info.grad_year}
          major={info.major}
          pe={stats.pe}
          majorElec={stats.majorElec}
          depth={stats.depth}
          breadth={stats.breadth}
          humElec={stats.humElec}
          muddHum={stats.muddHum}
          writ={stats.writ}
          id={info.auth0_id}
          majorChecks={info.majorChecks}
          coreChecks={info.coreChecks}
          ELEV={ELEV}
        />
      </Grid>
    </Grid>
  )
}

export default InfoCards
