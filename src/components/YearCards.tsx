import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Year from './Year'

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    background: '#282c34',
  },
  innerContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.down('lg')]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  },
}))

function YearCards(): JSX.Element {
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

export default YearCards
