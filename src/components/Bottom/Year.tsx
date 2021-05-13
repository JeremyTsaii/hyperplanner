import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ReactLoading from 'react-loading'
import { placeholderCourses } from '../../static/infoLists'
import CourseContainer from './CourseContainer'
import { UserContext } from '../../context/UserContext'
import { CoursesContext } from '../../context/CoursesContext'

const useStyles = makeStyles((theme) => ({
  loadingStyle: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.primary.main,
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

  if (infoLoading || coursesLoading) {
    return (
      <div className={classes.loadingStyle}>
        <ReactLoading type="cylon" height="2%" width="2%" />
      </div>
    )
  }

  return (
    <CourseContainer
      showIcons={!(infoError || coursesError)}
      yearNumber={yearNumber}
      courses={
        infoError || coursesError ? placeholderCourses : coursesData.courses
      }
    />
  )
}

export default Year
