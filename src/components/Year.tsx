import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import ReactLoading from 'react-loading'
import { GET_COURSES_QUERY } from '../utils/gqlQueries'
import CourseModal from './CourseModal'
import { placeholderCourses } from '../static/infoLists'
import CourseContainer from './CourseContainer'

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

  const { loading, error, data } = useQuery(GET_COURSES_QUERY)

  if (loading) {
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
  if (error) {
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

  // After logging in, fill placeholders with icons/modals and correct courses
  const { courses } = data
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
