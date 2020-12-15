import React, { useState, useRef } from 'react'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {
  campuses,
  credits,
  types,
  bools,
  courseSort,
} from '../static/infoLists'
/* eslint-disable */
import {
  Courses,
  useUpdate_CourseMutation,
  useIncrement_Course_EditsMutation,
  Get_CoursesQuery,
  Get_CoursesDocument,
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

interface editProps {
  functional: boolean
  activeProp: boolean
  codeProp: string
  titleProp: string
  creditsProp: number
  typeProp: string
  campusProp: string
  writIntenProp: boolean
  termProp: string
}

function EditModal({
  functional,
  activeProp,
  codeProp,
  titleProp,
  creditsProp,
  typeProp,
  campusProp,
  writIntenProp,
  termProp,
}: editProps): JSX.Element {
  const [updateCourse] = useUpdate_CourseMutation()
  const [updateCourseEdits] = useIncrement_Course_EditsMutation()
  const oldTitle = titleProp
  const oldCode = codeProp

  const getValue = (ref: React.MutableRefObject<string>): string => {
    const cur = (ref.current as unknown) as HTMLTextAreaElement
    return cur.value
  }

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  // Create refs for string inputs in text field
  const codeRef = useRef('')
  const [code, setCode] = useState(codeProp)

  const titleRef = useRef('')
  const [title, setTitle] = useState(titleProp)

  // Changing information in modal
  const [campus, setCampus] = useState(campusProp)

  const [credit, setCredit] = useState(String(creditsProp.toFixed(1)))

  const [type, setType] = useState(typeProp)

  const [writInten, setWritInten] = useState(capitalize(String(writIntenProp)))

  const handleCampusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setCampus(target.value)
  }

  const handleCreditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setCredit(target.value)
  }

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
    setCampus(campusProp)
    setCredit(String(creditsProp.toFixed(1)))
    setType(typeProp)
    setWritInten(capitalize(String(writIntenProp)))
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    resetInputs()
    setOpen(false)
  }
  const handleSave = () => {
    // Update user course_edits column
    updateCourseEdits()

    let newCode = getValue(codeRef)
    let newTitle = getValue(titleRef)

    if (newCode === '') {
      newCode = oldCode
    }
    if (newTitle === '') {
      newTitle = oldTitle
    }
    updateCourse({
      variables: {
        old_title: oldTitle,
        active: activeProp,
        term: termProp,
        title: newTitle,
        code: newCode,
        credits: parseFloat(credit),
        type,
        campus,
        writ_inten: writInten === 'True',
      },
      update(cache) {
        /* eslint-disable */
        const existingCourses = cache.readQuery<Get_CoursesQuery>({
          query: Get_CoursesDocument,
        })
        const newCourses = existingCourses!.courses.map((course) => {
          if (course.title === oldTitle && course.term === termProp) {
            const newCourse = {} as Courses
            newCourse.__typename = 'courses'
            newCourse.active = activeProp
            newCourse.term = termProp
            newCourse.title = newTitle
            newCourse.code = newCode
            newCourse.credits = parseFloat(credit)
            newCourse.type = type
            newCourse.campus = campus
            newCourse.writ_inten = writInten === 'True'
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
              active: activeProp,
              term: termProp,
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
    setCode(newCode)
    setTitle(newTitle)
    setOpen(false)
  }

  // Return icon but no functionality (logged out)
  if (!functional) {
    return (
      <IconButton edge="end" aria-label="edit" size="small" onClick={undefined}>
        <EditIcon />
      </IconButton>
    )
  }

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="edit"
        size="small"
        onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle onClose={handleClose}>Edit Course</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Course Code"
            placeholder={code}
            required
            fullWidth
            inputRef={codeRef}
            autoComplete="off"
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Course Title"
            placeholder={title}
            fullWidth
            required
            inputRef={titleRef}
            autoComplete="off"
          />
          <TextField
            select
            label="Campus"
            fullWidth
            required
            value={campus}
            onChange={handleCampusChange}>
            {campuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Credits"
            fullWidth
            required
            value={credit}
            onChange={handleCreditChange}>
            {credits.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
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
            Edit Course
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditModal
