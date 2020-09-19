import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Autocomplete } from '@material-ui/lab'

import {
  placeholderCourses,
  types,
  bools,
  courseSort,
} from '../static/infoLists'
/* eslint-disable */
import {
  useAdd_CourseMutation,
  Get_CoursesQuery,
  Get_CoursesDocument,
  Courses,
} from '../generated/graphql'
/* eslint-enable */

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))

interface DialogProps {
  term: string
  year: string
}

interface DialogTitleProps {
  onClose: () => void
  children: React.ReactNode
}

const DialogTitle = ({ onClose, children }: DialogTitleProps) => {
  const dialogClasses = useStyles()

  return (
    <MuiDialogTitle disableTypography className={dialogClasses.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={dialogClasses.closeButton}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
}

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

function CourseModal({ term, year }: DialogProps): JSX.Element {
  const [addCourse] = useAdd_CourseMutation()

  // Changing information in modal
  const [campus, setCampus] = useState('')

  const [credit, setCredit] = useState('')

  const [type, setType] = useState('')

  const [writInten, setWritInten] = useState('False')

  const [titleRef, setTitle] = useState('')

  const [codeRef, setCode] = useState('')

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setType(target.value)
  }

  const handleWritIntenChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = event.target as HTMLInputElement
    setWritInten(target.value)
  }

  // Opening/Closing modal
  const [open, setOpen] = useState(false)

  const resetInputs = () => {
    setTitle('')
    setCode('')
    setCampus('')
    setCredit('')
    setType('')
    setWritInten('False')
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    resetInputs()
    setOpen(false)
  }
  const allFilled = () => {
    return (
      campus !== '' &&
      credit !== '' &&
      type !== '' &&
      codeRef !== '' &&
      titleRef !== ''
    )
  }
  const handleSave = () => {
    const newTitle = titleRef
    const newCode = codeRef
    const formatTerm = term.toLowerCase() + year
    if (allFilled()) {
      addCourse({
        variables: {
          term: formatTerm,
          title: newTitle,
          code: newCode,
          credits: parseFloat(credit),
          type,
          campus,
          writ_inten: writInten === 'True',
        },
        update(cache) {
          /* eslint-disable */
          const getExistingCourses = cache.readQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
          })
          const existingCourses = getExistingCourses
            ? getExistingCourses.courses
            : []

          const newCourse = {} as Courses
          newCourse.__typename = 'courses'
          newCourse.term = formatTerm
          newCourse.title = newTitle
          newCourse.code = newCode
          newCourse.credits = parseFloat(credit)
          newCourse.type = type
          newCourse.campus = campus
          newCourse.writ_inten = writInten === 'True'

          // Sort by descending type then ascending code
          const sortedCourses = existingCourses.concat(newCourse)
          sortedCourses.sort(courseSort)
          console.log(sortedCourses)
          cache.writeQuery<Get_CoursesQuery>({
            query: Get_CoursesDocument,
            data: { courses: sortedCourses },
          })
          /* eslint-enable */
        },
        optimisticResponse: {
          __typename: 'mutation_root',
          insert_courses: {
            __typename: 'courses_mutation_response',
            affected_rows: 1,
            returning: [
              {
                __typename: 'courses',
                term: formatTerm,
                title: newTitle,
                code: newCode,
                credits: parseFloat(credit),
                type,
                campus,
                writ_inten: writInten === 'True',
              },
            ],
          },
        },
      })
      resetInputs()
      setOpen(false)
    }
  }
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div>
      <IconButton edge="end" aria-label="add" size="small" onClick={handleOpen}>
        <AddIcon color="primary" />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle onClose={handleClose}>
          Add Course to {term}, Year {year}
        </DialogTitle>
        <DialogContent dividers>
          <Autocomplete
            options={placeholderCourses}
            onChange={(event: any, newValue: any | null) => {
              setCampus(newValue.campus)
              setCode(newValue.code)
              setTitle(newValue.title)
              setCredit(newValue.credits)
            }}
            fullWidth
            style={{ width: 400 }}
            getOptionLabel={(option) => `${option.code} ${option.title}`}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Search for your courses"
                margin="normal"
                fullWidth
              />
            )}
          />
          <TextField
            select
            label="Course Type"
            fullWidth
            required
            value={type}
            onChange={handleTypeChange}>
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Writing Intensive?"
            fullWidth
            required
            value={writInten}
            onChange={handleWritIntenChange}>
            {bools.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            Add Course
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CourseModal
