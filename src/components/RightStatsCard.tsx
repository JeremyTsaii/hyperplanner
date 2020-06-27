import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  statsCard: {
    background: '#3A3F55',
    width: theme.spacing(100),
    height: theme.spacing(25),
    marginRight: theme.spacing(10),
    flexGrow: 3,
  },
  header: {
    color: '#fff',
    fontSize: '25px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  personalStats: {
    color: '#fff',
    fontSize: '17px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
}))

interface statsProps {
  totalCredits: number
  creditsRem: number
  avgCredits: number
  avgRem: number
  ELEV: number
}

function RightStatsCard({
  totalCredits,
  creditsRem,
  avgCredits,
  avgRem,
  ELEV,
}: statsProps): JSX.Element {
  const classes = useStyles()

  return (
    <Grid item>
      <Paper elevation={ELEV} className={classes.statsCard}>
        <Typography className={classes.personalStats}>
          Total Credits: {totalCredits}
        </Typography>
        <Typography className={classes.personalStats}>
          Credits Remaining: {creditsRem}
        </Typography>
        <Typography className={classes.personalStats}>
          Average Credits per Semester: {avgCredits}
        </Typography>
        <Typography className={classes.personalStats}>
          Remaining Average Credits: {avgRem}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default RightStatsCard
