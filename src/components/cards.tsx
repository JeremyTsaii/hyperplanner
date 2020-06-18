import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Course from './course'
import reqs from '../static/requirements.json'

// Page elevation constant
const ELEV = 12

// Color constants
const BLACK = '#282c34'
const GREY = '#515969'
const PINK = '#e91e63' // Major
const BLUE = '#2196f3' // Core
const GREEN = '#1de9b6' // Hums (Breadth)
const ORANGE = '#ef5350' // Hums (Depth)
const PURPLE = '#7c4dff' // Other (PE)

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    background: BLACK,
  },
  innerContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  mainCard: {
    background: GREY,
    margin: theme.spacing(1),
    height: theme.spacing(30),
    flexGrow: 1,
  },
  summerCard: {
    background: GREY,
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
        <Paper elevation={ELEV} id="fall1" className={classes.mainCard}>
          <Course
            code="CSCI 105"
            title="Computer Systems"
            credits={3}
            color={PINK}
          />
          <Course
            code="CSCI 121"
            title="Software Development"
            credits={3}
            color={ORANGE}
          />
          <Course
            code="CSCI 134"
            title="Operating Systems"
            credits={3}
            color={BLUE}
          />
          <Course
            code="CSCI 140"
            title="Algorithms"
            credits={3}
            color={GREEN}
          />
          <Course
            code="CSCI 151"
            title="Artificial Intelligence"
            credits={3}
            color={PURPLE}
          />
        </Paper>
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
