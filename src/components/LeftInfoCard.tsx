import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InfoModal from './InfoModal'

const useStyles = makeStyles((theme) => ({
  infoCard: {
    background: '#3A3F55',
    width: theme.spacing(40),
    height: theme.spacing(25),
    marginLeft: theme.spacing(10),
    flexGrow: 1,
    marginRight: theme.spacing(4),
  },
  header: {
    color: '#fff',
    fontSize: '25px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  personalInfo: {
    color: '#fff',
    fontSize: '17px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
  },
}))

interface infoProps {
  firstName: string
  schoolName: string
  majorName: string
  concName: string
  gradYear: number
  ELEV: number
}

function LeftInfoCard({
  firstName,
  schoolName,
  majorName,
  concName,
  gradYear,
  ELEV,
}: infoProps): JSX.Element {
  const classes = useStyles()

  return (
    <Grid item>
      <Paper elevation={ELEV} className={classes.infoCard}>
        <Typography variant="h5" className={classes.header}>
          Hello {firstName}!
        </Typography>
        <Typography className={classes.personalInfo}>
          School: {schoolName}
        </Typography>
        <Typography className={classes.personalInfo}>
          Major: {majorName}
        </Typography>
        <Typography className={classes.personalInfo}>
          Concentration: {concName}
        </Typography>
        <Typography className={classes.personalInfo}>
          Graduation Year: {gradYear}
        </Typography>
        <InfoModal />
      </Paper>
    </Grid>
  )
}

export default LeftInfoCard
