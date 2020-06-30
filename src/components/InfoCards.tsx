import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'

// Page elevation constant
const ELEV = 12

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#282c34',
    display: 'flex',
    paddingRight: theme.spacing(14),
    paddingLeft: theme.spacing(14),
    alignItems: 'stretch',
    flexWrap: 'nowrap',
  },
  infoCard: {
    background: '#3A3F55',
    height: theme.spacing(25),
    flexGrow: 1,
    marginRight: theme.spacing(3),
    boxSizing: 'border-box',
  },
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
      xs={12}
      className={classes.container}
      direction="row"
      justify="space-between">
      <Grid item xs={3}>
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
      <Grid item xs={9}>
        <Paper elevation={ELEV} className={classes.statsCard}>
          <div className={classes.reqStatSection}>
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
    </Grid>
  )
}

export default InfoCards
