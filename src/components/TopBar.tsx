import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GitButton from './GitButton'
import DownloadButton from './DownloadButton'
import LoginButton from './LoginButton'
import YearStepper from './Stepper'
import Logo from '../images/logo.png'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: '#282c34',
  },
  toolBar: {},
  menuButton: {},
  title: {},
  stepper: {
    flexGrow: 1,
  },
  sideButtons: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
}))

function TopBar(): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolBar}>
          <img alt="logo" style={{ width: 50, paddingRight: 10 }} src={Logo} />
          <Typography variant="h5" color="secondary" className={classes.title}>
            HyperPlanner
          </Typography>
          <Grid className={classes.stepper}>
            <YearStepper />
          </Grid>
          <Grid className={classes.sideButtons}>
            <DownloadButton />
            <GitButton />
            <LoginButton />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TopBar
