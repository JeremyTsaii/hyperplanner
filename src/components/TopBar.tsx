import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GitButton from './GitButton'
import LoginButton from './LoginButton'
import YearStepper from './Stepper'
import Logo from '../images/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: '20px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '15px',
  },
  appBar: {
    background: '#23252e',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
  },
  toolBar: { display: 'flex', justifyContent: 'space-between' },
  menuButton: {},
  title: {
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
            <Typography
              variant="h5"
              color="secondary"
              className={classes.title}>
              HyperPlanner
            </Typography>
          </div>
          <Grid className={classes.stepper}>
            <YearStepper />
          </Grid>
          <Grid className={classes.sideButtons}>
            <GitButton />
            <LoginButton />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TopBar
