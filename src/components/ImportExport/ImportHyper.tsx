import React, { useState, useRef, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SaveButton from './SaveButton'
import { cleanHyper } from '../../utils/jsonFunctions'
import { UserContext } from '../../context/UserContext'
import {
  generateUserCoreRequirements,
  generateUserMajorRequirements,
} from '../../context/StatsContext'
import { CourseType, courseSort } from '../../static/infoLists'
import {
  useAdd_Multiple_CoursesMutation,
  useRemove_Semester_CoursesMutation,
  Get_CoursesQuery,
  Get_CoursesDocument,
} from '../../generated/graphql'

const useStyles = makeStyles((theme) => ({
  instructions: {
    color: theme.palette.primary.main,
  },
  link: {
    color: theme.palette.success.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  textField: {
    color: theme.palette.secondary.main,
  },
}))

function ImportHyper(): JSX.Element {
  const classes = useStyles()

  const { data } = useContext(UserContext)
  const user = data.users[0]

  // Get json text input
  const getJsonField = (ref: React.MutableRefObject<string>): string => {
    const cur = ref.current as unknown as HTMLTextAreaElement
    return cur.value
  }

  const [status, setStatus] = useState('Import')
  const [formatError, setFormatError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const jsonRef = useRef('')

  const [addMultipleCourses] = useAdd_Multiple_CoursesMutation()
  const [removeSemesterCourses] = useRemove_Semester_CoursesMutation()

  const handleSave = () => {
    const { majorReqTable } = generateUserMajorRequirements(
      user.major,
      user.school,
    )
    const { coreReqTable } = generateUserCoreRequirements(
      user.enroll,
      user.school,
    )
    const [isValid, result, term] = cleanHyper(
      getJsonField(jsonRef),
      majorReqTable,
      coreReqTable,
      user.enroll,
      user.major,
      user.concentration,
    )

    setFormatError(!isValid)
    setErrorText(
      !isValid
        ? 'Please enter a well-formed, non-empty JSON courses array'
        : '',
    )

    if (isValid) {
      // Append __typename to each course for cache update
      const coursesCache = result.map((course: CourseType) => ({
        ...course,
        __typename: 'courses',
      }))

      let changeLength = 0
      setStatus('Successfully Imported')

      // Delete courses in corresponding semester
      removeSemesterCourses({
        variables: {
          term,
        },
        update(cache) {
          const courseQuery = cache.readQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
          })

          const existingCourses = courseQuery ? courseQuery.courses : []

          const newCourses = existingCourses.filter(
            (course) => course.term !== term,
          )
          newCourses.sort(courseSort)

          changeLength = existingCourses.length - newCourses.length
          cache.writeQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
            data: { courses: newCourses },
          })
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
          const courseQuery = cache.readQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
          })

          const existingCourses = courseQuery ? courseQuery.courses : []

          const sortedCourses = existingCourses
            .concat(coursesCache)
            .sort(courseSort)

          cache.writeQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
            data: { courses: sortedCourses },
          })
        },
        optimisticResponse: {
          __typename: 'mutation_root',
          insert_courses: {
            __typename: 'courses_mutation_response',
            affected_rows: result.length,
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
