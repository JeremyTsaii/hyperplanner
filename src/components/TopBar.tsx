import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GitButton from './GitButton'
import LoginButton from './LoginButton'
import YearStepper from './Stepper'
import Logo from '../images/logo.png'
import HelpModal from './HelpModal'
import ImportExportModal from './ImportExportModal'
import { CoursesContext } from '../context/CoursesContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  appBar: {
    background: '#191b21',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
  },
  toolBar: { display: 'flex', justifyContent: 'space-between' },
  title: {
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  stepper: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  sideButtons: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifySelf: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(.8)',
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.6)',
    },
  },
}))

function TopBar(): JSX.Element {
  const classes = useStyles()

  const { loading, error } = useContext(CoursesContext)

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolBar}>
          <div className={classes.brand}>
            <img
              alt="logo"
              style={{ width: 50, paddingRight: 10 }}
              src={Logo}
            />
            <Typography variant="h5" className={classes.title}>
              HyperPlanner
            </Typography>
          </div>
          <Grid className={classes.stepper}>
            <YearStepper />
          </Grid>
          <Grid className={classes.sideButtons}>
            {!loading && !error && <ImportExportModal />}
            <HelpModal />
            <GitButton />
            <LoginButton />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TopBar
