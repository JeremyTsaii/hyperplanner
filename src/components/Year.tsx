import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ReactLoading from 'react-loading'
import CourseModal from './CourseModal'
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

const createAddModal = (term: string, yearNumber: number): JSX.Element => {
  return <CourseModal year={String(yearNumber)} term={term} />
}

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
        <ReactLoading type="cylon" color="#f50057" height="2%" width="2%" />
      </div>
    )
  }

  // When not logged in, use placeholderCourses
  let coursePlaceholder = placeholderCourses
  let fallModalPlaceholder = <div />
  let springModalPlaceholder = <div />
  let summerModalPlaceholder = <div />

  // Not logged in
  if (infoError || coursesError) {
    return (
      <CourseContainer
        showIcons={false}
        yearNumber={yearNumber}
        courses={coursePlaceholder}
        fallModal={fallModalPlaceholder}
        springModal={springModalPlaceholder}
        summerModal={summerModalPlaceholder}
      />
    )
  }

  const { courses } = coursesData

  coursePlaceholder = courses
  fallModalPlaceholder = createAddModal('Fall', yearNumber)
  springModalPlaceholder = createAddModal('Spring', yearNumber)
  summerModalPlaceholder = createAddModal('Summer', yearNumber)

  return (
    <CourseContainer
      showIcons
      yearNumber={yearNumber}
      courses={coursePlaceholder}
      fallModal={fallModalPlaceholder}
      springModal={springModalPlaceholder}
      summerModal={summerModalPlaceholder}
    />
  )
}

export default Year
