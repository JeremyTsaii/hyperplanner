import React, { useState, useRef, useContext } from 'react'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  schools,
  schoolDict,
  majors,
  majorDict,
  concentrations,
  enrollYears,
  CourseType,
  courseSort,
} from '../../static/infoLists'
import {
  useUpdate_UserMutation,
  Get_InfoQuery,
  Get_InfoDocument,
  useAdd_Multiple_CoursesMutation,
  useRemove_All_CoursesMutation,
  Get_CoursesQuery,
  Get_CoursesDocument,
} from '../../generated/graphql'
import { UserContext } from '../../context/UserContext'
import {
  generateUserCoreRequirements,
  generateUserMajorRequirements,
} from '../../context/StatsContext'
import { CoursesContext } from '../../context/CoursesContext'
import { determineCourseType } from '../../utils/jsonFunctions'

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
}))

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

const updateGradDates = (start: number): { value: string }[] => {
  return [
    {
      value: `Fall ${start}`,
    },
    {
      value: `Spring ${start + 1}`,
    },
    {
      value: `Fall ${start + 1}`,
    },
    {
      value: `Spring ${start + 2}`,
    },
    {
      value: `Fall ${start + 2}`,
    },
    {
      value: `Spring ${start + 3}`,
    },
    {
      value: `Fall ${start + 3}`,
    },
    {
      value: `Spring ${start + 4}`,
    },
  ]
}

function InfoModal(): JSX.Element {
  const classes = useStyles()

  const [updateUser] = useUpdate_UserMutation()
  const { data: userData } = useContext(UserContext)
  const {
    nickname: firstName,
    school: schoolName,
    major: majorName,
    concentration: concName,
    auth0_id: id,
    enroll: enrollYear,
    planned_grad: plannedGradYear,
  } = userData.users[0]
  const { data: coursesData } = useContext(CoursesContext)

  const [addMultipleCourses] = useAdd_Multiple_CoursesMutation()
  const [removeAllCourses] = useRemove_All_CoursesMutation()

  // Changing information in modal
  const nameRef = useRef('')

  const [school, setSchool] = useState(schoolDict[schoolName])

  const [major, setMajor] = useState(majorDict[majorName])

  const [concentration, setConcentration] = useState(concName)

  const [enroll, setEnroll] = useState(String(enrollYear))

  const [plannedGrad, setPlannedGrad] = useState(plannedGradYear)

  const getValue = (ref: React.MutableRefObject<string>): string => {
    const cur = ref.current as unknown as HTMLTextAreaElement
    return cur.value
  }

  const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setSchool(schoolDict[target.value])
  }

  const handleMajorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setMajor(majorDict[target.value])
  }

  const handleConcentrationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = event.target as HTMLInputElement
    setConcentration(target.value)
  }

  const handleEnrollChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setEnroll(target.value)
  }

  const handlePlannedGradChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = event.target as HTMLInputElement
    setPlannedGrad(target.value)
  }

  // Opening/Closing modal
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setSchool(schoolDict[schoolName])
    setMajor(majorDict[majorName])
    setConcentration(concName)
    setEnroll(enrollYear)
    setPlannedGrad(plannedGradYear)
    setOpen(false)
  }

  const handleSave = () => {
    const newName = getValue(nameRef)

    // Make sure name is not empty
    if (newName !== '') {
      // Update user information
      updateUser({
        variables: {
          name: newName,
          school: schoolDict[school],
          major: majorDict[major],
          conc: concentration,
          id,
          enroll: parseFloat(enroll),
          plannedGrad,
        },
        update(cache) {
          const infoQuery = cache.readQuery<Get_InfoQuery>({
            query: Get_InfoDocument,
          })
          // Ensure infoQuery is non-null
          if (infoQuery) {
            const newInfo = { ...infoQuery.users[0] }
            newInfo.nickname = newName
            newInfo.school = schoolDict[school]
            newInfo.major = majorDict[major]
            newInfo.concentration = concentration
            newInfo.enroll = parseFloat(enroll)
            newInfo.planned_grad = plannedGrad
            cache.writeQuery<Get_InfoQuery>({
              query: Get_InfoDocument,
              data: { users: [newInfo] },
            })
          }
        },
        optimisticResponse: {
          __typename: 'mutation_root',
          update_users: {
            __typename: 'users_mutation_response',
            affected_rows: 1,
            returning: [
              {
                __typename: 'users',
                nickname: newName,
                school,
                major,
                concentration,
                enroll: parseFloat(enroll),
                planned_grad: plannedGrad,
              },
            ],
          },
        },
      })

      // Update course colors if major or concentration changed
      if (majorName !== majorDict[major] || concName !== concentration) {
        // Get current courses and update each course type
        const { majorReqTable } = generateUserMajorRequirements(
          majorDict[major],
          schoolDict[school],
        )
        const { coreReqTable } = generateUserCoreRequirements(
          parseFloat(enroll),
          schoolDict[school],
        )
        const newCourses = coursesData.courses.map((course: CourseType) => {
          const newCourse = {} as CourseType
          newCourse.type = determineCourseType(
            course.code,
            course.credits,
            majorReqTable,
            coreReqTable,
            majorDict[major],
            concentration,
          )
          newCourse.active = course.active
          newCourse.term = course.term
          newCourse.title = course.title
          newCourse.code = course.code
          newCourse.credits = course.credits
          newCourse.campus = course.campus
          newCourse.writ_inten = course.writ_inten
          return newCourse
        })

        // Append __typename to each course for cache update
        // Sort so displayed in correct order
        const coursesCache = newCourses
          .map((course: CourseType) => ({
            ...course,
            __typename: 'courses',
          }))
          .sort(courseSort)

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
              affected_rows: coursesData.courses.length,
            },
          },
        })

        // Write new courses with changed types
        addMultipleCourses({
          variables: {
            objects: newCourses,
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
      setOpen(false)
    }
  }

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="edit"
        size="small"
        color="secondary"
        onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle onClose={handleClose}>Edit Information</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            defaultValue={firstName}
            autoComplete="off"
            inputRef={nameRef}
            InputLabelProps={{
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}
          />
          <TextField
            select
            label="School"
            fullWidth
            value={schoolDict[school]}
            onChange={handleSchoolChange}
            InputLabelProps={{
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}>
            {schools.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Major"
            fullWidth
            value={majorDict[major]}
            onChange={handleMajorChange}
            InputLabelProps={{
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}>
            {majors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Concentration"
            fullWidth
            value={concentration}
            onChange={handleConcentrationChange}
            InputLabelProps={{
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}>
            {concentrations.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Start of Enrollment"
            fullWidth
            value={enroll}
            onChange={handleEnrollChange}
            InputLabelProps={{
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}>
            {enrollYears.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Planned Graduation"
            fullWidth
            value={plannedGrad}
            onChange={handlePlannedGradChange}
            InputLabelProps={{
              className: classes.textFieldLabel,
            }}
            InputProps={{
              className: classes.textInput,
            }}>
            {updateGradDates(parseFloat(enroll)).map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            Save Information
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InfoModal
