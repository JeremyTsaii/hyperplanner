import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import RightStatsCardStats from './RightStatsCardStats'
import RightStatsCardProgress from './RightStatsCardProgress'
import Requirements from '../../static/requirements.json'
import { UserContext } from '../../context/UserContext'
import { StatsContext } from '../../context/StatsContext'

const useStyles = makeStyles((theme) => ({
  statsCard: {
    background: theme.palette.info.dark,
    height: theme.spacing(25),
    flexGrow: 1,
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
    width: theme.spacing(19),
    margin: '0px',
    marginTop: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2),
    },
  },
  tab: {
    backgroundColor: theme.palette.info.dark,
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
  const checked = arr.reduce((a, b) => {
    const curVal = b === 2 ? 1 : 0
    return a + curVal
  }, 0)

  return (checked / len) * 100
}

function RightStatsCard({ ELEV }: statsProps): JSX.Element {
  const classes = useStyles()
  const [value, setValue] = useState('grad')

  const { data: userData } = useContext(UserContext)

  const { school, major, enroll } = userData.users[0]

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
    coreChecks,
    majorChecks,
  } = useContext(StatsContext)

  /* eslint-disable-next-line */
  const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
    setValue(value)
  }

  let dynamicStatsComponent = {}
  let dynamicProgressComponent = {}

  const schoolKey = school as keyof typeof Requirements
  const majorKey = major as keyof typeof Requirements[typeof schoolKey]['major']

  if (value === 'grad') {
    const titleArr = [
      'Total Credits:',
      'Credits Remaining:',
      'Average Credits per Semester:',
      'Remaining Average Credits:',
    ]
    const valArr = [totalCredits, creditsRem, avgCredits, avgRem]
    const totalRequired = Requirements[schoolKey].grad
    const peRequired = Requirements[schoolKey].pe
    const progressValArr = [
      (totalCredits / totalRequired) * 100,
      (pe / peRequired) * 100,
    ]
    const progressTitleArr = [
      `Credits (${totalCredits}/${totalRequired})`,
      `PE (${pe}/${peRequired})`,
    ]
    const endArr = [`/${totalRequired}`, '', '', '']

    dynamicStatsComponent = (
      <RightStatsCardStats
        titleArr={titleArr}
        valArr={valArr}
        endArr={endArr}
        isList={false}
      />
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
    const progressTitleArr = [
      'Completed',
      `Elective Credits (${majorElec}/${majorElecRequired})`,
    ]
    const progressValArr = [
      calculatePercentageChecked(majorChecks),
      (majorElec / majorElecRequired) * 100,
    ]

    dynamicStatsComponent = (
      <RightStatsCardStats
        isList
        checklist={checklist}
        checksArr={majorChecks}
      />
    )
    dynamicProgressComponent = (
      <RightStatsCardProgress
        progressTitleArr={progressTitleArr}
        progressValArr={progressValArr}
      />
    )
  } else if (value === 'core') {
    let coreTypeKey =
      'pre' as keyof typeof Requirements[typeof schoolKey]['core']
    if (enroll > 2018) {
      coreTypeKey =
        'post' as keyof typeof Requirements[typeof schoolKey]['core']
    }

    const checklist = Requirements[schoolKey].core[coreTypeKey].courses

    const progressTitleArr = ['Completed']
    const progressValArr = [calculatePercentageChecked(coreChecks)]

    dynamicStatsComponent = (
      <RightStatsCardStats
        isList
        checklist={checklist}
        checksArr={coreChecks}
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
    const endArr = [
      `/${depthRequired}`,
      `/${breadthRequired}`,
      `/${elecRequired}`,
      `/${muddRequired}`,
      `/${writRequired}`,
    ]

    const progressTitleArr = [
      `Depth (${depth}/${depthRequired})`,
      `Breadth (${breadth}/${breadthRequired})`,
      `Electives (${humElec}/${elecRequired})`,
      `Mudd (${muddHum}/${muddRequired})`,
      `Writing (${writ}/${writRequired})`,
    ]
    const progressValArr = [
      (depth / depthRequired) * 100,
      (breadth / breadthRequired) * 100,
      (humElec / elecRequired) * 100,
      (muddHum / muddRequired) * 100,
      (writ / writRequired) * 100,
    ]

    dynamicStatsComponent = (
      <RightStatsCardStats
        titleArr={titleArr}
        valArr={valArr}
        endArr={endArr}
        isList={false}
      />
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
