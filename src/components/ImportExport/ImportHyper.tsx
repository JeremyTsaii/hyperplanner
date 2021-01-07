import React, { useState, useRef, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SaveButton from './SaveButton'
import { cleanHyper } from '../../utils/jsonFunctions'
import { UserContext } from '../../context/UserContext'
import { StatsContext } from '../../context/StatsContext'
import { CourseType, courseSort } from '../../static/infoLists'
/* eslint-disable */
import {
  useAdd_Multiple_CoursesMutation,
  useRemove_Semester_CoursesMutation,
  Get_CoursesQuery,
  Get_CoursesDocument,
} from '../../generated/graphql'
/* eslint-enable */

const useStyles = makeStyles((theme) => ({
  instructions: {
    color: theme.palette.primary.main,
  },
  link: {
    color: '#2196f3',
    '&:hover': {
      color: '#673ab7',
    },
  },
  textField: {
    color: '#00897b',
  },
}))

function ImportHyper(): JSX.Element {
  const classes = useStyles()

  const { data } = useContext(UserContext)
  const user = data.users[0]

  const stats = useContext(StatsContext)
  // Get json text input
  const getJsonField = (ref: React.MutableRefObject<string>): string => {
    const cur = (ref.current as unknown) as HTMLTextAreaElement
    return cur.value
  }

  const [status, setStatus] = useState('Import')
  const [formatError, setFormatError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const jsonRef = useRef('')

  const [addMultipleCourses] = useAdd_Multiple_CoursesMutation()
  const [removeSemesterCourses] = useRemove_Semester_CoursesMutation()

  const handleSave = () => {
    const [isValid, result, term] = cleanHyper(
      getJsonField(jsonRef),
      stats,
      user,
    )

    setFormatError(!isValid)
    setErrorText(
      !isValid
        ? 'Please enter a well-formed, non-empty JSON courses array'
        : '',
    )

    if (isValid) {
      // Append __typename to each course for cache update
      const courses2 = result.map((course: CourseType) => ({
        ...course,
        __typename: 'courses',
      }))
      const sortedCourses = courses2.sort(courseSort)
      let changeLength = 0
      setStatus('Successfully Imported')

      // Delete courses in corresponding semester
      removeSemesterCourses({
        variables: {
          term,
        },
        update(cache) {
          /* eslint-disable */
          const existingCourses = cache.readQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
          })
          const newCourses = existingCourses!.courses.filter(
            (course) => course.term !== term,
          )
          changeLength = existingCourses!.courses.length - newCourses.length
          newCourses.sort(courseSort)
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
            affected_rows: changeLength,
          },
        },
      })
      // Write courses in inputted json field
      addMultipleCourses({
        variables: {
          objects: result,
        },
        update(cache) {
          /* eslint-disable */
          const getExistingCourses = cache.readQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
          })
          /* eslint-enable */

          const existingCourses = getExistingCourses
            ? getExistingCourses.courses
            : []

          const sortedCourses2 = existingCourses.concat(courses2)
          sortedCourses2.sort(courseSort)

          /* eslint-disable */
          cache.writeQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
            data: { courses: sortedCourses2 },
          })
          /* eslint-enable */
        },
        optimisticResponse: {
          __typename: 'mutation_root',
          insert_courses: {
            __typename: 'courses_mutation_response',
            affected_rows: result.length,
            returning: sortedCourses,
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
          - Go to{' '}
          <a
            className={classes.link}
            href="https://hyperschedule.io/"
            target="_blank"
            rel="noreferrer">
            Hyperschedule
          </a>{' '}
          and click &quot;<b>Import/ExportData</b>&quot;
        </p>
        <p>
          - <b>Copy and paste</b> the JSON into the field below to easily
          transfer your planned courses into your next semester
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
          <b>Warning:</b> this will <b>overwrite</b> courses in the
          corresponding semester
        </p>
      </div>
      <div>
        <SaveButton text={status} handleSave={handleSave} />
      </div>
    </div>
  )
}

export default ImportHyper
