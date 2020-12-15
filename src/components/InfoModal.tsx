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
} from '../static/infoLists'
/* eslint-disable */
import {
  useUpdate_UserMutation,
  Get_InfoQuery,
  Get_InfoDocument,
} from '../generated/graphql'
/* eslint-enable */
import { UserContext } from '../context/UserContext'

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

function InfoModal(): JSX.Element {
  const [updateUser] = useUpdate_UserMutation()
  const { data: infoData } = useContext(UserContext)
  const info = infoData.users[0]

  const {
    nickname: firstName,
    school: schoolName,
    major: majorName,
    concentration: concName,
    grad_year: grad,
    auth0_id: id,
    enroll: enrollYear,
    planned_grad: plannedGradYear,
  } = info

  // Changing information in modal
  const [name, setName] = useState(firstName)
  const nameRef = useRef('')

  const [school, setSchool] = useState(schoolDict[schoolName])

  const [major, setMajor] = useState(majorDict[majorName])

  const [concentration, setConcentration] = useState(concName)

  const [enroll, setEnroll] = useState(String(enrollYear))

  const [plannedGrad, setPlannedGrad] = useState(plannedGradYear)

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

  const getValue = (ref: React.MutableRefObject<string>): string => {
    const cur = (ref.current as unknown) as HTMLTextAreaElement
    return cur.value
  }

  const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setSchool(target.value)
  }

  const handleMajorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setMajor(target.value)
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
    setName(firstName)
    setSchool(schoolDict[schoolName])
    setMajor(majorDict[majorName])
    setConcentration(concName)
    setOpen(false)
    setEnroll(enrollYear)
    setPlannedGrad(plannedGradYear)
  }

  const handleSave = () => {
    let newName = getValue(nameRef)
    if (newName === '') {
      newName = firstName
    }
    updateUser({
      variables: {
        name: newName,
        school: schoolDict[school],
        major: majorDict[major],
        conc: concentration,
        gradYear: grad,
        id,
        enroll: parseFloat(enroll),
        plannedGrad,
      },
      update(cache) {
        /* eslint-disable */
        const existingInfo = cache.readQuery<Get_InfoQuery>({
          query: Get_InfoDocument,
        })
        const newInfo = { ...existingInfo!.users[0] }
        newInfo.nickname = newName
        newInfo.school = schoolDict[school]
        newInfo.major = majorDict[major]
        newInfo.concentration = concentration
        newInfo.grad_year = grad
        newInfo.enroll = parseFloat(enroll)
        newInfo.planned_grad = plannedGrad
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
              nickname: newName,
              school,
              major,
              concentration,
              grad_year: grad,
              enroll: parseFloat(enroll),
              planned_grad: plannedGrad,
            },
          ],
        },
      },
    })
    setName(newName)
    setOpen(false)
  }

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="edit"
        size="small"
        color="primary"
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
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            placeholder={name}
            autoComplete="off"
            inputRef={nameRef}
          />
          <TextField
            select
            label="School"
            fullWidth
            value={schoolDict[school]}
            onChange={handleSchoolChange}>
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
            onChange={handleMajorChange}>
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
            onChange={handleConcentrationChange}>
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
            onChange={handleEnrollChange}>
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
            onChange={handlePlannedGradChange}>
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
