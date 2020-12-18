import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SaveButton from './SaveButton'
import { campusDict, typeDict } from '../../static/infoLists'
/* eslint-disable */
import {
  useAdd_Multiple_CoursesMutation,
  useRemove_All_CoursesMutation,
} from '../../generated/graphql'
/* eslint-enable */

const useStyles = makeStyles(() => ({
  instructions: {
    color: '#f50057',
  },
  textField: {
    color: '#00897b',
  },
}))

/* eslint-disable-next-line */
const validJson = (jsonStr: string): [boolean, any] => {
  try {
    let result = true
    const json = JSON.parse(jsonStr)
    if (!Array.isArray(json) || json.length === 0) {
      return [false, null]
    }
    json.forEach(function validate(course) {
      const validLength = Object.keys(course).length === 7
      const validTerm =
        course.term !== 'undefined' &&
        /((fall)|(spring)|(summer))[1-4]$/.test(course.term)
      const validTitle =
        course.title !== 'undefined' && typeof course.title === 'string'
      const validCode =
        course.code !== 'undefined' && typeof course.code === 'string'
      const validCredits =
        course.credits !== 'undefined' && typeof course.credits === 'number'
      const validType =
        course.type !== 'undefined' &&
        Object.keys(typeDict).includes(course.type)
      const validCampus =
        course.campus !== 'undefined' &&
        Object.keys(campusDict).includes(course.campus)
      const validWrit =
        course.writ_inten !== 'undefined' &&
        typeof course.writ_inten === 'boolean'
      if (
        !(
          validLength &&
          validTerm &&
          validTitle &&
          validCode &&
          validCredits &&
          validType &&
          validCampus &&
          validWrit
        )
      ) {
        result = false
      }
    })
    return [result, json]
  } catch {
    return [false, null]
  }
}

function ImportJson(): JSX.Element {
  const classes = useStyles()

  const [status, setStatus] = useState('Import')
  const [formatError, setFormatError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const jsonRef = useRef('')

  const [addMultipleCourses] = useAdd_Multiple_CoursesMutation()
  const [removeAllCourses] = useRemove_All_CoursesMutation()

  // Get json text input
  const getJsonField = (ref: React.MutableRefObject<string>): string => {
    const cur = (ref.current as unknown) as HTMLTextAreaElement
    return cur.value
  }

  const handleSave = () => {
    // Ensure user entered valid json array of courses
    const [valid, courses] = validJson(getJsonField(jsonRef))
    setFormatError(!valid)
    setErrorText(
      !valid ? 'Please enter a well-formed, non-empty JSON courses array' : '',
    )

    if (valid) {
      setStatus('Imported')

      // Delete current courses
      removeAllCourses()

      // Write courses in inputted json field
      addMultipleCourses({
        variables: {
          objects: courses,
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
