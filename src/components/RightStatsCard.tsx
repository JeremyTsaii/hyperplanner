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
    maxWidth: '300px',
    width: '300px',
    margin: '0px',
    paddingTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2),
    },
  },
  statButton: {
    marginBottom: theme.spacing(0.5),
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
  ELEV: number
}

function RightStatsCard({
  totalCredits,
  creditsRem,
  avgCredits,
  avgRem,
  setting,
  ELEV,
}: statsProps): JSX.Element {
  const classes = useStyles()

  const [value, setValue] = useState(setting)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  let dynamicStatsComponent = {}
  let dynamicProgressComponent = {}

  if (value === 'grad') {
    const titleArr = [
      'Total Credits:',
      'Credits Remaining:',
      'Average Credits per Semester:',
      'Remaining Average Credits:',
    ]
    const valArr = [totalCredits, creditsRem, avgCredits, avgRem]
    const list = false
    const progressTitleArr = ['Credits', 'PE']
    const totalRequired = Requirements.hmc.grad
    const peRequired = Requirements.hmc.pe
    const progressValArr = [
      (totalCredits / totalRequired) * 100,
      (3 / peRequired) * 100,
    ]

    dynamicStatsComponent = (
      <RightStatsCardStats titleArr={titleArr} valArr={valArr} list={list} />
    )
    dynamicProgressComponent = (
      <RightStatsCardProgress
        progressTitleArr={progressTitleArr}
        progressValArr={progressValArr}
      />
    )
  } else if (value === 'major') {
    const list = true
    const checklist = Requirements.hmc.major.bio.major_req
    const progressTitleArr = ['Checked', 'Electives']
    const progressValArr = [30, 50]

    dynamicStatsComponent = (
      <RightStatsCardStats list={list} checklist={checklist} />
    )
    dynamicProgressComponent = (
      <RightStatsCardProgress
        progressTitleArr={progressTitleArr}
        progressValArr={progressValArr}
      />
    )
  } else if (value === 'core') {
    const list = true
    const checklist = Requirements.hmc.core.pre.courses
    const progressTitleArr = ['Checked']
    const progressValArr = [100]

    dynamicStatsComponent = (
      <RightStatsCardStats list={list} checklist={checklist} />
    )
    dynamicProgressComponent = (
      <RightStatsCardProgress
        progressTitleArr={progressTitleArr}
        progressValArr={progressValArr}
      />
    )
  } else if (value === 'hum') {
    const titleArr = [
      'Humanities Depth:',
      'Humanities Breadth:',
      'Humanities Electives:',
      'Mudd Hums:',
      'Writing Intensive:',
    ]
    const valArr = [1, 2, 3, 4, 5]
    const list = false
    const progressTitleArr = [
      'Depth',
      'Breadth',
      'Electives',
      'Mudd Hums',
      'Writing',
    ]
    const progressValArr = [30, 40, 50, 60, 70]

    dynamicStatsComponent = (
      <RightStatsCardStats titleArr={titleArr} valArr={valArr} list={list} />
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
                control={<Radio />}
                label="Graduation"
                className={classes.statButton}
              />
              <FormControlLabel
                value="major"
                control={<Radio />}
                label="Major"
                className={classes.statButton}
              />
              <FormControlLabel
                value="core"
                control={<Radio />}
                label="Core"
                className={classes.statButton}
              />
              <FormControlLabel
                value="hum"
                control={<Radio />}
                label="Humanities"
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
