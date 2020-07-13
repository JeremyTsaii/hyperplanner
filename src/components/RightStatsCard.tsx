import React, { useState } from 'react'
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

interface statsProps {
  totalCredits: number
  creditsRem: number
  avgCredits: number
  avgRem: number
  setting: string
  school: string
  gradYear: number
  major: string
  pe: number
  majorElec: number
  depth: number
  breadth: number
  humElec: number
  muddHum: number
  writ: number
  id: string
  majorChecks: string
  coreChecks: string
  ELEV: number
}

function RightStatsCard({
  totalCredits,
  creditsRem,
  avgCredits,
  avgRem,
  setting,
  school,
  gradYear,
  major,
  pe,
  majorElec,
  depth,
  breadth,
  humElec,
  muddHum,
  writ,
  id,
  majorChecks,
  coreChecks,
  ELEV,
}: statsProps): JSX.Element {
  const classes = useStyles()

  const [value, setValue] = useState(setting)

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
