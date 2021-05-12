import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import {
  makeStyles,
  responsiveFontSizes,
  createMuiTheme,
} from '@material-ui/core/styles'
import ReactLoading from 'react-loading'
import LeftInfoCard from './LeftInfoCard'
import RightStatsCard from './RightStatsCard'
import { UserContext } from '../context/UserContext'
import { CoursesContext } from '../context/CoursesContext'

let theme = createMuiTheme({
  typography: {
    fontSize: 10,
  },
})

theme = responsiveFontSizes(theme)

// Page elevation constant
const ELEV = 12

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      flexWrap: 'wrap',
    },
  },
  loadingStyle: {
    color: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
  },
  loginText: {
    color: theme.palette.primary.main,
    fontSize: '30px',
  },
}))

function InfoCards(): JSX.Element {
  const classes = useStyles()

  const { loading: infoLoading, error: infoError } = useContext(UserContext)
  const { loading: coursesLoading, error: coursesError } = useContext(
    CoursesContext,
  )

  if (infoLoading || coursesLoading) {
    return (
      <div className={classes.loadingStyle}>
        <ReactLoading type="cylon" height="2%" width="2%" />
      </div>
    )
  }

  if (infoError || coursesError) {
    return (
      <div className={classes.loginText}>Please enable pop-ups & log in!</div>
    )
  }

  return (
    <Grid
      container
      className={classes.container}
      direction="row"
      justify="space-between">
      <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
        <LeftInfoCard ELEV={ELEV} />
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
        <RightStatsCard ELEV={ELEV} />
      </Grid>
    </Grid>
  )
}

export default InfoCards
