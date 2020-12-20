import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ReactLoading from 'react-loading'
import { placeholderCourses } from '../static/infoLists'
import CourseContainer from './CourseContainer'
import { UserContext } from '../context/UserContext'
import { CoursesContext } from '../context/CoursesContext'

const useStyles = makeStyles(() => ({
  loadingStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

interface IProps {
  yearNumber: number
}

const Year = ({ yearNumber }: IProps): JSX.Element => {
  const classes = useStyles()

  const { loading: infoLoading, error: infoError } = useContext(UserContext)
  const {
    loading: coursesLoading,
    error: coursesError,
    data: coursesData,
  } = useContext(CoursesContext)

  // const rng = Math.floor(Math.random() * 2)

  // const [coursePlaceholder, setCourses] = useState(placeholderCourses)
  // const schedules = [placeholderCourses, csSchedule, engSchedule]

  // useEffect(() => {
  //   setCourses(schedules[Math.floor(Math.random() * 2)])
  // }, [coursePlaceholder])

  if (infoLoading || coursesLoading) {
    return (
      <div className={classes.loadingStyle}>
        <ReactLoading type="cylon" color="#f50057" height="2%" width="2%" />
      </div>
    )
  }

  // When not logged in, use placeholderCourses
  let coursePlaceholder = placeholderCourses

  // Not logged in
  if (infoError || coursesError) {
    return (
      <CourseContainer
        showIcons={false}
        yearNumber={yearNumber}
        courses={coursePlaceholder}
      />
    )
  }

  const { courses } = coursesData

  coursePlaceholder = courses

  return (
    <CourseContainer
      showIcons
      yearNumber={yearNumber}
      courses={coursePlaceholder}
    />
  )
}

export default Year
