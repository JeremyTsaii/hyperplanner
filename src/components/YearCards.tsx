import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { DragDropContext } from 'react-beautiful-dnd'
import Year from './Year'

const useStyles = makeStyles((theme) => ({
  innerContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(0),
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
      marginRight: theme.spacing(0.3),
      marginLeft: theme.spacing(0.3),
    },
    [theme.breakpoints.down('lg')]: {
      marginRight: theme.spacing(0.3),
      marginLeft: theme.spacing(0.3),
    },
  },
}))

const YearCards = (): JSX.Element => {
  const classes = useStyles()

  const handleOnDragEnd = (result: any) => {
    // Prevent dragging out of bounds
    if (!result.destination) return
    console.log(result)
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12} className={classes.innerContainer}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Year yearNumber={1} />
          <Year yearNumber={2} />
          <Year yearNumber={3} />
          <Year yearNumber={4} />
        </DragDropContext>
      </Grid>
    </Grid>
  )
}

export default YearCards
