import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InfoModal from './InfoModal'

const useStyles = makeStyles((theme) => ({
  infoCard: {
    display: 'flex',
    background: '#3A3F55',
    height: theme.spacing(25),
    flexGrow: 1,
    marginRight: theme.spacing(3),
    flexDirection: 'column',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
    MsOverflowStyle: 'none',
    scrollbarWidth: 'none',
  },
  header: {
    color: '#fff',
    fontSize: '21px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  personalInfo: {
    color: '#fff',
    fontSize: '15px',
    textAlign: 'left',
    marginLeft: theme.spacing(2),
  },
  editIcon: {
    alignSelf: 'flex-end',
    margin: '0',
    marginRight: theme.spacing(2),
  },
}))

interface infoProps {
  firstName: string
  schoolName: string
  majorName: string
  concName: string
  gradYear: number
  id: string
  ELEV: number
}

function LeftInfoCard({
  firstName,
  schoolName,
  majorName,
  concName,
  gradYear,
  id,
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
          <b>School:</b> {schoolName}
        </Typography>
        <Typography className={classes.personalInfo}>
          <b>Major:</b> {majorName}
        </Typography>
        <Typography className={classes.personalInfo}>
          <b>Concentration:</b> {concName}
        </Typography>
        <Typography className={classes.personalInfo}>
          <b>Graduation Year:</b> {gradYear}
        </Typography>
        <div className={classes.editIcon}>
          <InfoModal
            nameProp={firstName}
            schoolProp={schoolName}
            majorProp={majorName}
            concProp={concName}
            gradYearProp={gradYear}
            idProp={id}
          />
        </div>
      </Paper>
    </Grid>
  )
}

export default LeftInfoCard
