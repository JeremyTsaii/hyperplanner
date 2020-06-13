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
    background: '#515969',
    margin: theme.spacing(1),
    width: theme.spacing(30),
    height: theme.spacing(20),
    flexGrow: 1,
  },
  statsCard: {
    background: '#515969',
    margin: theme.spacing(1),
    width: theme.spacing(80),
    height: theme.spacing(20),
    flexGrow: 1,
  },
}))

function Info(): JSX.Element {
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
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
