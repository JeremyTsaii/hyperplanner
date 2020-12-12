import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { modifyChecklist } from '../utils/modalFunctions'
/* eslint-disable */
import {
  useRemove_CourseMutation,
  useUpdate_Major_ChecksMutation,
  useUpdate_Core_ChecksMutation,
  useIncrement_Course_EditsMutation,
  Get_InfoDocument,
  Get_InfoQuery,
  Get_CoursesQuery,
  Get_CoursesDocument,
} from '../generated/graphql'
/* eslint-enable */
import { UserContext } from '../context/UserContext'

interface deleteProps {
  functional: boolean
  term: string
  title: string
  code: string
}

function DeleteIcon({
  functional,
  term,
  title,
  code,
}: deleteProps): JSX.Element {
  const [courseRemove] = useRemove_CourseMutation()
  const [updateCourseEdits] = useIncrement_Course_EditsMutation()
  const [updateMajorChecks] = useUpdate_Major_ChecksMutation()
  const [updateCoreChecks] = useUpdate_Core_ChecksMutation()

  const { data: infoData } = useContext(UserContext)

  // Delete course on icon click
  // If not functional, clicking does nothing (user logged out)
  const handleDelete = !functional
    ? undefined
    : () => {
        const info = infoData.users[0]
        const { majorChecks, coreChecks, school, auth0_id: id } = info

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

        // Update checklists
        const [newMajorChecks, newCoreChecks] = modifyChecklist(
          code,
          0,
          majorChecks,
          coreChecks,
          school,
        )

        updateMajorChecks({
          variables: {
            id,
            majorChecks: newMajorChecks,
          },
          update(cache) {
            /* eslint-disable */
            const existingInfo = cache.readQuery<Get_InfoQuery>({
              query: Get_InfoDocument,
            })
            const newInfo = { ...existingInfo!.users[0] }
            newInfo.majorChecks = newMajorChecks
            cache.writeQuery<Get_InfoQuery>({
              query: Get_InfoDocument,
              data: { users: [newInfo] },
            })
            /* eslint-enable */
          },
          optimisticResponse: {
            __typename: 'mutation_root',
            update_users: {
              __typename: 'users_mutation_response',
              affected_rows: 1,
              returning: [
                {
                  __typename: 'users',
                  majorChecks: newMajorChecks,
                },
              ],
            },
          },
        })

        updateCoreChecks({
          variables: {
            id,
            coreChecks: newCoreChecks,
          },
          update(cache) {
            /* eslint-disable */
            const existingInfo = cache.readQuery<Get_InfoQuery>({
              query: Get_InfoDocument,
            })
            const newInfo = { ...existingInfo!.users[0] }
            newInfo.coreChecks = newCoreChecks
            cache.writeQuery<Get_InfoQuery>({
              query: Get_InfoDocument,
              data: { users: [newInfo] },
            })
            /* eslint-enable */
          },
          optimisticResponse: {
            __typename: 'mutation_root',
            update_users: {
              __typename: 'users_mutation_response',
              affected_rows: 1,
              returning: [
                {
                  __typename: 'users',
                  coreChecks: newCoreChecks,
                },
              ],
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
