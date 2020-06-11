import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  grid: {
    background: '#282c34',
  },
}))

function Info(): JSX.Element {
  const classes = useStyles()

  return <Grid className={classes.grid} />
}

export default Info
