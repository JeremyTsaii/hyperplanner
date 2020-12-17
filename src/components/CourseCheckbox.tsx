import React from 'react'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import { courseSort } from '../static/infoLists'
/* eslint-disable */
import {
  Get_CoursesQuery,
  Get_CoursesDocument,
  useUpdate_CourseMutation,
  Courses,
} from '../generated/graphql'
/* eslint-enable */

interface checkboxProps {
  functional: boolean
  active: boolean
  code: string
  title: string
  credits: number
  type: string
  campus: string
  writInten: boolean
  term: string
}

function CourseCheckbox({
  functional,
  active,
  term,
  title,
  code,
  credits,
  type,
  campus,
  writInten,
}: checkboxProps): JSX.Element {
  const [updateCourse] = useUpdate_CourseMutation()

  // Check if course is currently active
  const [isActive, setActive] = React.useState(active)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCourse({
      variables: {
        old_title: title,
        active: !isActive,
        term,
        title,
        code,
        credits,
        type,
        campus,
        writ_inten: writInten,
      },
      update(cache) {
        /* eslint-disable */
        const existingCourses = cache.readQuery<Get_CoursesQuery>({
          query: Get_CoursesDocument,
        })
        const newCourses = existingCourses!.courses.map((course) => {
          if (course.code === code && course.term === term) {
            const newCourse = {} as Courses
            newCourse.__typename = 'courses'
            newCourse.active = !isActive
            newCourse.term = term
            newCourse.title = title
            newCourse.code = code
            newCourse.credits = credits
            newCourse.type = type
            newCourse.campus = campus
            newCourse.writ_inten = writInten
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
              active: !isActive,
              term,
              title,
              code,
              credits,
              type,
              campus,
              writ_inten: writInten,
            },
          ],
        },
      },
    })
    setActive(event.target.checked)
  }

  return (
    <Grid item xs={1} zeroMinWidth>
      <Checkbox
        checked={isActive}
        color="default"
        size="small"
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </Grid>
  )
}

export default CourseCheckbox
