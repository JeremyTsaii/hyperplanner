import React, { useState, useRef, useContext } from 'react'
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
import AllCourses from '../static/allCourses.json'
import { UserContext } from '../context/UserContext'
import {
  generateUserCoreRequirements,
  generateUserMajorRequirements,
} from '../context/StatsContext'
import { determineCourseType } from '../utils/jsonFunctions'
import {
  types,
  bools,
  courseSort,
  credits,
  campuses,
} from '../static/infoLists'
/* eslint-disable */
import {
  useAdd_CourseMutation,
  useIncrement_Course_EditsMutation,
  Get_CoursesQuery,
  Get_CoursesDocument,
  Courses,
} from '../generated/graphql'
/* eslint-enable */

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.info.dark,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  textFieldLabel: {
    color: theme.palette.primary.main,
  },
  textInput: {
    color: 'white',
  },
  autoComplete: {
    '& .MuiAutocomplete-inputRoot': {
      color: 'white',
    },
  },
}))

type AllCourse = {
  campus: string
  code: string
  title: string
  credits: number
}

interface DialogProps {
  functional: boolean
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
      <Typography color="primary" variant="h6">
        {children}
      </Typography>
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
    backgroundColor: theme.palette.info.dark,
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.info.dark,
  },
}))(MuiDialogActions)

function CourseModal({ functional, term, year }: DialogProps): JSX.Element {
  const classes = useStyles()

  // Introduce user and stats context for course Determination
  const { data: infoData } = useContext(UserContext)

  const [updateCourseEdits] = useIncrement_Course_EditsMutation()
  const [addCourse] = useAdd_CourseMutation()

  // Changing information in modal
  const [campus, setCampus] = useState('')

  const [credit, setCredit] = useState('')

  const [type, setType] = useState('')

  const [writInten, setWritInten] = useState('False')

  // Create refs for string inputs in text field
  // Need ref and normal state due to placeholders
  const codeRef = useRef('')
  const titleRef = useRef('')

  const getValue = (ref: React.MutableRefObject<string>): string => {
    const cur = (ref.current as unknown) as HTMLTextAreaElement
    return cur.value
  }

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

  // Reset inputs to default in the modal
  const resetInputs = () => {
    setCampus('')
    setCredit('')
    setType('')
    setWritInten('False')
  }

  const handleOpen = !functional
    ? undefined
    : () => {
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
      getValue(codeRef) !== '' &&
      getValue(titleRef) !== ''
    )
  }
  const handleSave = () => {
    const newTitle = getValue(titleRef)
    const newCode = getValue(codeRef)
    const formatTerm = term.toLowerCase() + year
    if (allFilled()) {
      addCourse({
        variables: {
          active: true,
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
          newCourse.active = true
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
                active: true,
              },
            ],
          },
        },
      })

      // Update course edits
      updateCourseEdits()

      resetInputs()
      setOpen(false)
    }
  }
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div>
      <IconButton edge="end" aria-label="add" size="small" onClick={handleOpen}>
        <AddIcon color="secondary" />
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
            options={AllCourses}
            onChange={(event, newValue: AllCourse | null) => {
              if (newValue !== null) {
                const curCode = (codeRef.current as unknown) as HTMLTextAreaElement
                curCode.value = newValue.code
                const curTitle = (titleRef.current as unknown) as HTMLTextAreaElement
                curTitle.value = newValue.title
                setCampus(newValue.campus)
                setCredit(newValue.credits.toFixed(1))

                // Determine Course Type
                const info = infoData.users[0]
                const { majorReqTable } = generateUserMajorRequirements(
                  info.major,
                  info.school,
                )
                const { coreReqTable } = generateUserCoreRequirements(
                  info.enroll,
                  info.school,
                )
                setType(
                  determineCourseType(
                    newValue.code,
                    parseFloat(credit),
                    majorReqTable,
                    coreReqTable,
                    info.major,
                    info.concentration,
                  ),
                )
              }
            }}
            fullWidth
            className={classes.autoComplete}
            style={{ width: 400 }}
            getOptionLabel={(option) => `${option.code} ${option.title}`}
            renderInput={(params) => (
              <TextField
                {...params}
                color="primary"
                variant="standard"
                label="Search for your courses"
                margin="normal"
                fullWidth
                InputLabelProps={{
                  className: classes.textFieldLabel,
                }}
              />
            )}
          />
          <TextField
            autoFocus
            color="primary"
            margin="dense"
            id="code"
            label="Course Code"
            required
            fullWidth
            inputRef={codeRef}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}
          />
          <TextField
            autoFocus
            color="primary"
            margin="dense"
            id="title"
            label="Course Title"
            fullWidth
            required
            inputRef={titleRef}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}
          />
          <TextField
            color="primary"
            select
            label="Campus"
            fullWidth
            required
            value={campus}
            InputLabelProps={{
              shrink: true,
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            onChange={handleCampusChange}>
            {campuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            color="primary"
            select
            label="Credits"
            fullWidth
            required
            value={credit}
            InputLabelProps={{
              shrink: true,
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            onChange={handleCreditChange}>
            {credits.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            color="primary"
            select
            label="Course Type"
            fullWidth
            required
            value={type}
            InputLabelProps={{
              shrink: true,
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            onChange={handleTypeChange}>
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            color="primary"
            select
            label="Writing Intensive?"
            fullWidth
            required
            value={writInten}
            InputLabelProps={{
              shrink: true,
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}
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
