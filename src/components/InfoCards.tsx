import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

// Page elevation constant
const ELEV = 12

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#282c34',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  infoCard: {
    background: '#3A3F55',
    width: theme.spacing(40),
    height: theme.spacing(25),
    marginLeft: theme.spacing(10),
    flexGrow: 1,
    marginRight: theme.spacing(4),
  },
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
  personalInfo: {
    color: '#fff',
    fontSize: '17px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
  },
  personalStats: {
    color: '#fff',
    fontSize: '17px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  editIcon: {
    alignSelf: 'end',
    left: theme.spacing(16),
  },
}))

interface infoProps {
  firstName: string
  schoolName: string
  majorName: string
  concName: string
  gradYear: number
  totalCredits: number
  creditsRem: number
  avgCredit: number
  avgRem: number
}

function InfoCards({
  firstName,
  schoolName,
  majorName,
  concName,
  gradYear,
  totalCredits,
  creditsRem,
  avgCredit,
  avgRem,
}: infoProps): JSX.Element {
  const classes = useStyles()

  return (
    <Grid
      container
      className={classes.container}
      direction="row"
      justify="center"
      alignItems="center">
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
          <IconButton
            edge="end"
            aria-label="edit"
            size="small"
            color="secondary"
            className={classes.editIcon}>
            <EditIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item>
        <Paper elevation={ELEV} className={classes.statsCard}>
          <Typography className={classes.personalStats}>
            Total Credits: {totalCredits}
          </Typography>
          <Typography className={classes.personalStats}>
            Credits Remaining: {creditsRem}
          </Typography>
          <Typography className={classes.personalStats}>
            Average Credits per Semester: {avgCredit}
          </Typography>
          <Typography className={classes.personalStats}>
            Remaining Average Credits: {avgRem}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default InfoCards
