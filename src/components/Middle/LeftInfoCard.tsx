import React, { useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InfoModal from './InfoModal'
import { schoolDict, majorDict } from '../../static/infoLists'
import { UserContext } from '../../context/UserContext'

const useStyles = makeStyles((theme) => ({
  infoCard: {
    display: 'flex',
    background: theme.palette.info.dark,
    height: theme.spacing(25),
    flexGrow: 1,
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: '0',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '0',
    },
    flexDirection: 'column',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
    MsOverflowStyle: 'none',
    scrollbarWidth: 'none',
    alignContent: 'space-between',
  },
  header: {
    color: '#fff',
    fontSize: '22px',
    textAlign: 'left',
    marginLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '7px',
      paddingTop: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
  },
  personalInfo: {
    color: '#fff',
    fontSize: '17.5px',
    textAlign: 'left',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '7px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '17px',
    },
  },
  editIcon: {
    alignSelf: 'flex-end',
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
}))

interface infoProps {
  ELEV: number
}

function LeftInfoCard({ ELEV }: infoProps): JSX.Element {
  const classes = useStyles()
  const { data: userData } = useContext(UserContext)

  const user = userData.users[0]

  const firstName = user.nickname
  const schoolName = schoolDict[user.school]
  const majorName = majorDict[user.major]
  const concName = user.concentration
  const enrollYear = user.enroll
  const plannedGrad = user.planned_grad

  return (
    <Grid item>
      <Paper elevation={ELEV} className={classes.infoCard}>
        <div>
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
            <b>Year Enrolled:</b> {enrollYear}
          </Typography>
          <Typography className={classes.personalInfo}>
            <b>Planned Graduation:</b> {plannedGrad}
          </Typography>
        </div>
        <div className={classes.editIcon}>
          <InfoModal />
        </div>
      </Paper>
    </Grid>
  )
}

export default LeftInfoCard
