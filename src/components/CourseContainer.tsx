import React, { useState } from 'react'
import {
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd'
import Paper from '@material-ui/core/Paper'
import { Typography, Button } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/core/styles'
import Course from './Course'
import { CourseType } from '../static/infoLists'
import TermCheckbox from './TermCheckbox'
import CourseModal from './CourseModal'

const useStyles = makeStyles((theme) => ({
  mainCard: {
    background: '#191b21',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    width: theme.spacing(25),
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '88%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      width: '97%',
    },
  },
  semesterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  semesterButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  courseContainer: {
    background: '#191b21',
  },
  yearText: {
    color: '#fff',
    fontSize: '22px',
    marginTop: theme.spacing(1),
  },
  paper: {
    background: '#191b21',
    margin: theme.spacing(0.75),
  },
  semesterCollapse: {
    color: '#white',
    textAlign: 'left',
    alignItems: 'flex-start',
  },
  semesterCheckbox: {
    marginRight: theme.spacing(1),
  },
}))

interface IProps {
  showIcons: boolean
  yearNumber: number
  courses: CourseType[]
}

const CourseContainer = ({
  showIcons,
  yearNumber,
  courses,
}: IProps): JSX.Element => {
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

  // Hack to disable animation except for currently dragged course
  // https://github.com/atlassian/react-beautiful-dnd/issues/374
  const getStyle = (
    style: DraggingStyle | NotDraggingStyle | undefined,
    snapshot: DraggableStateSnapshot,
    /* eslint-disable-next-line */
  ): any => {
    if (!snapshot.isDragging) return {}
    if (!snapshot.isDropAnimating) return style

    return {
      ...style,
      transitionDuration: '0.001s',
    }
  }

  const fallTerm = `fall${yearNumber}`
  const springTerm = `spring${yearNumber}`
  const summerTerm = `summer${yearNumber}`

  const fallCourses = courses.filter(
    (course: CourseType) => course.term === fallTerm,
  )
  const springCourses = courses.filter(
    (course: CourseType) => course.term === springTerm,
  )
  const summerCourses = courses.filter(
    (course: CourseType) => course.term === summerTerm,
  )

  return (
    <Paper elevation={12} className={classes.mainCard}>
      <Typography className={classes.yearText}>Year {yearNumber}</Typography>
      <div className={classes.semesterHeader}>
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={handleChangeFall}
          className={classes.semesterCollapse}>
          Fall:{' '}
          {fallCourses.reduce((count: number, course: CourseType) => {
            return course.active ? count + course.credits : count
          }, 0)}
        </Button>
        <div className={classes.semesterButtons}>
          <TermCheckbox
            functional={showIcons}
            numCourses={fallCourses.length}
            className={classes.semesterCheckbox}
            termString={fallTerm}
          />
          <CourseModal
            functional={showIcons}
            year={String(yearNumber)}
            term="Fall"
          />
        </div>
      </div>
      <div className={classes.courseContainer}>
        <Collapse in={checkedFall}>
          <Droppable droppableId={fallTerm}>
            {(providedDrop, snapshotDrop) => {
              return (
                <div
                  ref={providedDrop.innerRef}
                  /* eslint-disable-next-line */
                  {...providedDrop.droppableProps}>
                  <Paper elevation={0} className={classes.paper}>
                    {fallCourses.map((course: CourseType, index) => (
                      <Draggable
                        key={course.term + course.code}
                        draggableId={course.term + course.code}
                        index={index}>
                        {(providedDrag, snapshotDrag) => {
                          return (
                            <div
                              ref={providedDrag.innerRef}
                              /* eslint-disable */
                              {...providedDrag.draggableProps}
                              {...providedDrag.dragHandleProps}
                              /* eslint-enable */
                              style={getStyle(
                                providedDrag.draggableProps.style,
                                snapshotDrag,
                              )}>
                              <Course
                                key={course.term + course.code}
                                code={course.code}
                                title={course.title}
                                credits={course.credits}
                                type={course.type}
                                campus={course.campus}
                                writInten={course.writ_inten}
                                term={course.term}
                                showIcons={showIcons}
                                active={course.active}
                              />
                            </div>
                          )
                        }}
                      </Draggable>
                    ))}
                  </Paper>
                  {providedDrop.placeholder}
                </div>
              )
            }}
          </Droppable>
        </Collapse>
      </div>
      <div className={classes.semesterHeader}>
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={handleChangeSpring}
          className={classes.semesterCollapse}>
          Spring:{' '}
          {springCourses.reduce((count: number, course: CourseType) => {
            return course.active ? count + course.credits : count
          }, 0)}
        </Button>
        <div className={classes.semesterButtons}>
          <TermCheckbox
            functional={showIcons}
            numCourses={springCourses.length}
            className={classes.semesterCheckbox}
            termString={springTerm}
          />
          <CourseModal
            functional={showIcons}
            year={String(yearNumber)}
            term="Spring"
          />
        </div>
      </div>
      <div className={classes.courseContainer}>
        <Collapse in={checkedSpring}>
          <Paper elevation={0} className={classes.paper}>
            {springCourses.map((course: CourseType) => (
              <Course
                key={course.term + course.code}
                code={course.code}
                title={course.title}
                credits={course.credits}
                type={course.type}
                campus={course.campus}
                writInten={course.writ_inten}
                term={course.term}
                showIcons={showIcons}
                active={course.active}
              />
            ))}
          </Paper>
        </Collapse>
      </div>
      <div className={classes.semesterHeader}>
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={handleChangeSummer}
          className={classes.semesterCollapse}>
          Summer:{' '}
          {summerCourses.reduce((count: number, course: CourseType) => {
            return course.active ? count + course.credits : count
          }, 0)}
        </Button>
        <div className={classes.semesterButtons}>
          <TermCheckbox
            functional={showIcons}
            numCourses={summerCourses.length}
            className={classes.semesterCheckbox}
            termString={summerTerm}
          />
          <CourseModal
            functional={showIcons}
            year={String(yearNumber)}
            term="Summer"
          />
        </div>
      </div>
      <div className={classes.courseContainer}>
        <Collapse in={checkedSummer}>
          <Paper elevation={0} className={classes.paper}>
            {summerCourses.map((course: CourseType) => (
              <Course
                key={course.term + course.code}
                code={course.code}
                title={course.title}
                credits={course.credits}
                type={course.type}
                campus={course.campus}
                writInten={course.writ_inten}
                term={course.term}
                showIcons={showIcons}
                active={course.active}
              />
            ))}
          </Paper>
        </Collapse>
      </div>
    </Paper>
  )
}

export default CourseContainer
