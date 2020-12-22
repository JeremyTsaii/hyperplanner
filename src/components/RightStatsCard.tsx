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
import { StatsContext } from '../context/StatsContext'

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

interface statsProps {
  ELEV: number
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

  const info = infoData.users[0]

  const { school, major, auth0_id: id, majorChecks, coreChecks, enroll } = info

  const stats = useContext(StatsContext)

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
    if (enroll > 2018) {
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
        enroll={enroll}
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
