import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/client'
import ReactLoading from 'react-loading'
import { GET_COURSES_QUERY, GET_INFO_QUERY } from '../utils/gqlQueries'
import CourseModal from './CourseModal'
import { placeholderCourses } from '../static/infoLists'
import CourseContainer from './CourseContainer'

const useStyles = makeStyles(() => ({
  loadingStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

const createAddModal = (
  term: string,
  yearNumber: number,
  majorChecks: string,
  coreChecks: string,
  school: string,
  id: string,
): JSX.Element => {
  return (
    <CourseModal
      year={String(yearNumber)}
      term={term}
      majorChecks={majorChecks}
      coreChecks={coreChecks}
      school={school}
      id={id}
    />
  )
}

interface IProps {
  yearNumber: number
}

const Year = ({ yearNumber }: IProps): JSX.Element => {
  const classes = useStyles()

  const { loading: infoLoading, error: infoError, data: infoData } = useQuery(
    GET_INFO_QUERY,
  )
  const {
    loading: coursesLoading,
    error: coursesError,
    data: coursesData,
  } = useQuery(GET_COURSES_QUERY)

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
        majorChecks=""
        coreChecks=""
        school=""
        id=""
      />
    )
  }

  // After logging in, fill placeholders with icons/modals and correct courses
  const info = infoData.users[0]
  const { courses } = coursesData

  coursePlaceholder = courses
  fallModalPlaceholder = createAddModal(
    'Fall',
    yearNumber,
    info.majorChecks,
    info.coreChecks,
    info.school,
    info.auth0_id,
  )
  springModalPlaceholder = createAddModal(
    'Spring',
    yearNumber,
    info.majorChecks,
    info.coreChecks,
    info.school,
    info.auth0_id,
  )
  summerModalPlaceholder = createAddModal(
    'Summer',
    yearNumber,
    info.majorChecks,
    info.coreChecks,
    info.school,
    info.auth0_id,
  )

  return (
    <CourseContainer
      showIcons
      yearNumber={yearNumber}
      courses={coursePlaceholder}
      fallModal={fallModalPlaceholder}
      springModal={springModalPlaceholder}
      summerModal={summerModalPlaceholder}
      majorChecks={info.majorChecks}
      coreChecks={info.coreChecks}
      school={info.school}
      id={info.auth0_id}
    />
  )
}

export default Year
