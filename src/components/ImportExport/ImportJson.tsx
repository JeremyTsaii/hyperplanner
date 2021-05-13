import React, { useState, useRef, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SaveButton from './SaveButton'
import { validJson } from '../../utils/jsonFunctions'
import { CourseType, courseSort } from '../../static/infoLists'
import {
  useAdd_Multiple_CoursesMutation,
  useRemove_All_CoursesMutation,
  Get_CoursesQuery,
  Get_CoursesDocument,
} from '../../generated/graphql'
import { CoursesContext } from '../../context/CoursesContext'

const useStyles = makeStyles((theme) => ({
  instructions: {
    color: theme.palette.primary.main,
  },
  textField: {
    color: theme.palette.secondary.main,
  },
}))

function ImportJson(): JSX.Element {
  const classes = useStyles()

  const { data } = useContext(CoursesContext)

  const [status, setStatus] = useState('Import')
  const [formatError, setFormatError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const jsonRef = useRef('')

  const [addMultipleCourses] = useAdd_Multiple_CoursesMutation()
  const [removeAllCourses] = useRemove_All_CoursesMutation()

  // Get json text input
  const getJsonField = (ref: React.MutableRefObject<string>): string => {
    const cur = ref.current as unknown as HTMLTextAreaElement
    return cur.value
  }

  const handleSave = () => {
    // Ensure user entered valid json array of courses
    const [isValid, courses] = validJson(getJsonField(jsonRef))

    setFormatError(!isValid)
    setErrorText(
      !isValid
        ? 'Please enter a well-formed, non-empty JSON courses array'
        : '',
    )

    if (isValid) {
      // Append __typename to each course for cache update
      const coursesCache = courses
        .map((course: CourseType) => ({
          ...course,
          __typename: 'courses',
        }))
        .sort(courseSort)

      setStatus('Successfully Imported')

      // Delete current courses
      removeAllCourses({
        update(cache) {
          cache.writeQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
            data: { courses: [] },
          })
        },
        optimisticResponse: {
          __typename: 'mutation_root',
          delete_courses: {
            __typename: 'courses_mutation_response',
            affected_rows: data.courses.length,
          },
        },
      })

      // Write courses in inputted json field
      addMultipleCourses({
        variables: {
          objects: courses,
        },
        update(cache) {
          cache.writeQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
            data: { courses: coursesCache },
          })
        },
        optimisticResponse: {
          __typename: 'mutation_root',
          insert_courses: {
            __typename: 'courses_mutation_response',
            affected_rows: coursesCache.length,
            returning: coursesCache,
          },
        },
      })
    }
  }

  return (
    <div>
      <div className={classes.instructions}>
        <p>Instructions:</p>
        <p>
          - <b>Copy and paste</b> the JSON from the &quot;Export JSON&quot;
          field of another account into the field below to easily transfer/share
          your courses
        </p>
      </div>
      <div>
        <TextField
          inputRef={jsonRef}
          error={formatError}
          helperText={errorText}
          InputProps={{
            className: classes.textField,
          }}
          multiline
          rowsMax="10"
          fullWidth
          variant="filled"
        />
      </div>
      <div className={classes.instructions}>
        <p>
          <b>Warning:</b> this will <b>overwrite</b> all of your current courses
        </p>
      </div>
      <div>
        <SaveButton text={status} handleSave={handleSave} />
      </div>
    </div>
  )
}

export default ImportJson
