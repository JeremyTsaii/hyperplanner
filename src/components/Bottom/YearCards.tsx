import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { DragDropContext } from 'react-beautiful-dnd'
import Year from './Year'
/* eslint-disable */
import {
  Courses,
  useUpdate_CourseMutation,
  Get_CoursesQuery,
  Get_CoursesDocument,
} from '../../generated/graphql'
/* eslint-enable */
import { courseSort } from '../../static/infoLists'
import { UserContext } from '../../context/UserContext'

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
  const [updateCourse] = useUpdate_CourseMutation()
  const { error } = useContext(UserContext)

  /* eslint-disable-next-line */
  const handleOnDragEnd = (result: any) => {
    // Prevent dragging out of bounds
    if (!result.destination) return

    // Don't do anything if logged out
    if (!error) {
      const dstId = result.destination.droppableId
      const srcId = result.source.droppableId
      // User dragged course to same semester
      if (srcId === dstId) return

      const courseInfo = JSON.parse(result.draggableId)

      updateCourse({
        variables: {
          active: courseInfo.active,
          old_title: courseInfo.title,
          term: dstId,
          title: courseInfo.title,
          code: courseInfo.code,
          credits: courseInfo.credits,
          type: courseInfo.type,
          campus: courseInfo.campus,
          writ_inten: courseInfo.writ_inten,
        },
        update(cache) {
          /* eslint-disable */
          const existingCourses = cache.readQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
          })

          const newCourses = existingCourses!.courses.map((course) => {
            if (course.title === courseInfo.title && course.term === srcId) {
              const newCourse = {} as Courses
              newCourse.__typename = 'courses'
              newCourse.active = courseInfo.active
              newCourse.term = dstId
              newCourse.title = courseInfo.title
              newCourse.code = courseInfo.code
              newCourse.credits = courseInfo.credits
              newCourse.type = courseInfo.type
              newCourse.campus = courseInfo.campus
              newCourse.writ_inten = courseInfo.writ_inten
              return newCourse
            }
            return course
          })
          newCourses.sort(courseSort)
          cache.writeQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
            data: { courses: newCourses },
          })
          /* eslint-enable */
        },
        optimisticResponse: {
          __typename: 'mutation_root',
          update_courses: {
            __typename: 'courses_mutation_response',
            affected_rows: 1,
            returning: [
              {
                __typename: 'courses',
                active: courseInfo.active,
                term: dstId,
                title: courseInfo.title,
                code: courseInfo.code,
                credits: courseInfo.credits,
                type: courseInfo.type,
                campus: courseInfo.campus,
                writ_inten: courseInfo.writ_inten,
              },
            ],
          },
        },
      })
    }
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
