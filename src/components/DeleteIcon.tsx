import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
/* eslint-disable */
import {
  useRemove_CourseMutation,
  useIncrement_Course_EditsMutation,
  Get_InfoDocument,
  Get_InfoQuery,
  Get_CoursesQuery,
  Get_CoursesDocument,
} from '../generated/graphql'
/* eslint-enable */

interface deleteProps {
  functional: boolean
  term: string
  title: string
}

function DeleteIcon({ functional, term, title }: deleteProps): JSX.Element {
  const [courseRemove] = useRemove_CourseMutation()
  const [updateCourseEdits] = useIncrement_Course_EditsMutation()

  // Delete course on icon click
  // If not functional, clicking does nothing (user logged out)
  const handleDelete = !functional
    ? undefined
    : () => {
        // Update user course_edits column
        updateCourseEdits()

        // Remove course
        courseRemove({
          variables: { term, title },
          update(cache) {
            /* eslint-disable */
            const existingCourses = cache.readQuery<Get_CoursesQuery>({
              query: Get_CoursesDocument,
            })
            const newCourses = existingCourses!.courses.filter((course) => {
              return course.title !== title || course.term !== term
            })
            cache.writeQuery<Get_CoursesQuery>({
              query: Get_CoursesDocument,
              data: { courses: newCourses },
            })
            /* eslint-enable */
          },
          optimisticResponse: {
            __typename: 'mutation_root',
            delete_courses: {
              __typename: 'courses_mutation_response',
              affected_rows: 1,
            },
          },
        })
      }

  return (
    <Grid item xs={1} zeroMinWidth>
      <IconButton
        edge="end"
        aria-label="delete"
        size="small"
        onClick={handleDelete}>
        <DeleteForeverIcon />
      </IconButton>
    </Grid>
  )
}

export default DeleteIcon
