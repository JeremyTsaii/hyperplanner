import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  statsCard: {
    background: '#3A3F55',
    height: theme.spacing(25),
    flexGrow: 4,
    flexDirection: 'row',
    display: 'flex',
    boxSizing: 'border-box',
    marginLeft: theme.spacing(1),
    justifyContent: 'space-between',
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
  reqButtonSection: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    width: '300px',
    margin: '0px',
    paddingTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  reqStatSection: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    width: '400px',
    margin: '0px',
  },
  statButton: {
    marginBottom: theme.spacing(1),
    height: theme.spacing(4),
    textAlign: 'left',
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
        <div className={classes.reqStatSection}>
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
        </div>
        <div className={classes.reqButtonSection}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.statButton}>
            Graduation
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.statButton}>
            Major
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.statButton}>
            Core
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.statButton}>
            Humanities
          </Button>
        </div>
      </Paper>
    </Grid>
  )
}

export default RightStatsCard
