import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Course from './Course'

// Color constants
const GREY = '#515969'
const PINK = '#e91e63' // Major
const BLUE = '#2196f3' // Core
// const GREEN = '#1de9b6' // Hums (Breadth)
const ORANGE = '#ef5350' // Hums (Depth)
const PURPLE = '#7c4dff' // Other (PE)

interface yearProps {
  yearNumber: number
}

const useStyles = makeStyles((theme) => ({
  mainCard: {
    background: '#3A3F55',
    margin: theme.spacing(2),
    height: theme.spacing(70),
    maxHeight: theme.spacing(70),
    overflowY: 'scroll',
    width: theme.spacing(25),
    flexGrow: 1,
  },
  semesterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  courseContainer: {
    background: '#3A3F55',
  },
  yearText: {
    color: '#fff',
    fontSize: '22px',
  },

  paper: {
    background: '#3A3F55',
    margin: theme.spacing(1),
  },
  semesterButton: {
    color: '#white',
  },
}))

function Year({ yearNumber }: yearProps): JSX.Element {
  const classes = useStyles()

  const [checkedFall, setCheckedFall] = useState(true)
  const handleChangeFall = () => {
    setCheckedFall((prev) => !prev)
  }

  const [checkedSpring, setCheckedSpring] = useState(true)
  const handleChangeSpring = () => {
    setCheckedSpring((prev) => !prev)
  }

  const [checkedSummer, setCheckedSummer] = useState(true)
  const handleChangeSummer = () => {
    setCheckedSummer((prev) => !prev)
  }

  return (
    <Paper elevation={12} id="fall1" className={classes.mainCard}>
      <Typography className={classes.yearText}>Year {yearNumber}</Typography>
      <div className={classes.semesterHeader}>
        <Button
          color="secondary"
          onClick={handleChangeFall}
          className={classes.semesterButton}>
          Fall
        </Button>
        <IconButton edge="end" aria-label="edit" size="small">
          <AddIcon color="secondary" />
        </IconButton>
      </div>
      <div className={classes.courseContainer}>
        <Collapse in={checkedFall}>
          <Paper elevation={0} className={classes.paper} />
        </Collapse>
      </div>
      <div className={classes.semesterHeader}>
        <Button
          color="secondary"
          onClick={handleChangeSpring}
          className={classes.semesterButton}>
          Spring
        </Button>
        <IconButton edge="end" aria-label="edit" size="small">
          <AddIcon color="secondary" />
        </IconButton>
      </div>
      <div className={classes.courseContainer}>
        <Collapse in={checkedSpring}>
          <Paper elevation={0} className={classes.paper} />
        </Collapse>
      </div>
      <div className={classes.semesterHeader}>
        <Button
          color="secondary"
          onClick={handleChangeSummer}
          className={classes.semesterButton}>
          Summer
        </Button>
        <IconButton edge="end" aria-label="edit" size="small">
          <AddIcon color="secondary" />
        </IconButton>
      </div>
      <div className={classes.courseContainer}>
        <Collapse in={checkedSummer}>
          <Paper elevation={0} className={classes.paper} />
        </Collapse>
      </div>
    </Paper>
  )
}

export default Year
