import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  grid: {
    background: '#282c34',
  },
}))

function Cards(): JSX.Element {
  const classes = useStyles()

  return (
    <Grid className={classes.grid}>
      <Paper />
      <Paper />
      <Paper />
      <Paper />
    </Grid>
  )
}

export default Cards
