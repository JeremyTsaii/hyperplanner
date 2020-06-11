import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

// Page elevation constant
const ELEV = 12

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    background: '#282c34',
  },
  innerContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  mainCard: {
    background: '#515969',
    margin: theme.spacing(1),
    height: theme.spacing(30),
    flexGrow: 1,
  },
  summerCard: {
    background: '#515969',
    margin: theme.spacing(1),
    height: theme.spacing(15),
    flexGrow: 1,
  },
}))

function Cards(): JSX.Element {
  const classes = useStyles()

  return (
    <Grid container justify="center" className={classes.outerContainer}>
      <Grid item xs={12} className={classes.innerContainer}>
        <Paper elevation={ELEV} id="fall1" className={classes.mainCard} />
        <Paper elevation={ELEV} id="fall2" className={classes.mainCard} />
        <Paper elevation={ELEV} id="fall3" className={classes.mainCard} />
        <Paper elevation={ELEV} id="fall4" className={classes.mainCard} />
      </Grid>
      <Grid item xs={12} className={classes.innerContainer}>
        <Paper elevation={ELEV} id="spring1" className={classes.mainCard} />
        <Paper elevation={ELEV} id="spring2" className={classes.mainCard} />
        <Paper elevation={ELEV} id="spring3" className={classes.mainCard} />
        <Paper elevation={ELEV} id="spring4" className={classes.mainCard} />
      </Grid>
      <Grid item xs={12} className={classes.innerContainer}>
        <Paper elevation={ELEV} id="summer1" className={classes.summerCard} />
        <Paper elevation={ELEV} id="summer2" className={classes.summerCard} />
        <Paper elevation={ELEV} id="summer3" className={classes.summerCard} />
        <Paper elevation={ELEV} id="summer4" className={classes.summerCard} />
      </Grid>
    </Grid>
  )
}

export default Cards
