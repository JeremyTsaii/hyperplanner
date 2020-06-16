import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

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
    margin: theme.spacing(1),
    width: theme.spacing(40),
    height: theme.spacing(25),
    flexGrow: 1,
  },
  statsCard: {
    background: '#3A3F55',
    margin: theme.spacing(1),
    marginLeft: theme.spacing(10),
    width: theme.spacing(100),
    height: theme.spacing(25),
    flexGrow: 1,
  },
}))

function Info(): JSX.Element {
  const classes = useStyles()

  return (
    <Grid
      container
      xs={12}
      className={classes.container}
      direction="row"
      justify="center"
      alignItems="center">
      <Grid item>
        <Paper elevation={ELEV} className={classes.infoCard} />
      </Grid>
      <Grid item>
        <Paper elevation={ELEV} className={classes.statsCard} />
      </Grid>
    </Grid>
  )
}

export default Info
