import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { courseSort } from '../static/infoLists'
/* eslint-disable */
import {
  Get_CoursesQuery,
  Get_CoursesDocument,
  useUpdate_Active_CoursesMutation,
  Courses,
} from '../generated/graphql'
/* eslint-enable */

interface termCheckboxProps {
  numCourses: number
  className: string
  termString: string
}

function TermCheckbox({
  numCourses,
  className,
  termString,
}: termCheckboxProps): JSX.Element {
  const [updateActiveCourses] = useUpdate_Active_CoursesMutation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSetActive = (active: boolean) => {
    updateActiveCourses({
      variables: {
        term: termString,
        active,
      },
      update(cache) {
        /* eslint-disable */
        const existingCourses = cache.readQuery<Get_CoursesQuery>({
          query: Get_CoursesDocument,
        })
        const newCourses = existingCourses!.courses.map((course) => {
          if (course.term === termString) {
            const newCourse = {} as Courses
            newCourse.__typename = 'courses'
            newCourse.active = active
            newCourse.term = course.term
            newCourse.title = course.title
            newCourse.code = course.code
            newCourse.credits = course.credits
            newCourse.type = course.type
            newCourse.campus = course.campus
            newCourse.writ_inten = course.writ_inten
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
          affected_rows: numCourses,
          returning: [
            {
              __typename: 'courses',
              active,
            },
          ],
        },
      },
    })
    setAnchorEl(null)
  }

  const setActiveText = `Set all ${termString.substr(
    0,
    termString.length - 1,
  )} courses active`
  const setInactiveText = `Set all ${termString.substr(
    0,
    termString.length - 1,
  )} courses inactive`

  return (
    <div className={className}>
      <IconButton
        size="small"
        aria-controls="term-check-all"
        aria-haspopup="true"
        onClick={handleOpen}>
        <DoneAllIcon color="primary" />
      </IconButton>
      <Menu
        id="term-check-all"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={() => handleSetActive(true)}>
          {' '}
          {setActiveText}{' '}
        </MenuItem>
        <MenuItem onClick={() => handleSetActive(false)}>
          {' '}
          {setInactiveText}{' '}
        </MenuItem>
      </Menu>
    </div>
  )
}

export default TermCheckbox
