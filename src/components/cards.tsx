import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Course from './course'
import Year from './year'

// Page elevation constant
const BLACK = '#282c34'

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    background: BLACK,
  },
  innerContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    marginLeft: theme.spacing(12),
    marginRight: theme.spacing(12),
  },
}))

function Cards(): JSX.Element {
  const classes = useStyles()

  return (
    <Grid container justify="center" className={classes.outerContainer}>
      <Grid item xs={12} className={classes.innerContainer}>
        <Year yearNumber={1} />
        <Year yearNumber={2} />
        <Year yearNumber={3} />
        <Year yearNumber={4} />
      </Grid>
    </Grid>
  )
}

export default Cards
