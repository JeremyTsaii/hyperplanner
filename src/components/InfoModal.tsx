import React, { useState, useRef } from 'react'
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
  gradYears,
} from '../static/infoLists'
/* eslint-disable */
import {
  useUpdate_UserMutation,
  Get_InfoQuery,
  Get_InfoDocument,
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
  nameProp: string
  schoolProp: string
  majorProp: string
  concProp: string
  gradYearProp: number
  idProp: string
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

function InfoModal({
  nameProp,
  schoolProp,
  majorProp,
  concProp,
  gradYearProp,
  idProp,
}: DialogProps): JSX.Element {
  const [updateUser] = useUpdate_UserMutation()

  // Changing information in modal
  const [name, setName] = useState(nameProp)
  const nameRef = useRef('')

  const [school, setSchool] = useState(schoolDict[schoolProp])

  const [major, setMajor] = useState(majorDict[majorProp])

  const [concentration, setConcentration] = useState(concProp)

  const [gradYear, setGradYear] = useState(String(gradYearProp))

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

  const handleGradYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setGradYear(target.value)
  }

  // Opening/Closing modal
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setName(nameProp)
    setSchool(schoolDict[schoolProp])
    setMajor(majorDict[majorProp])
    setConcentration(concProp)
    setGradYear(String(gradYearProp))
    setOpen(false)
  }

  const handleSave = () => {
    let newName = getValue(nameRef)
    if (newName === '') {
      newName = nameProp
    }
    updateUser({
      variables: {
        name: newName,
        school,
        major,
        conc: concentration,
        gradYear: parseFloat(gradYear),
        id: idProp,
      },
      update(cache) {
        /* eslint-disable */
        const existingInfo = cache.readQuery<Get_InfoQuery>({
          query: Get_InfoDocument,
        })
        const newInfo = existingInfo!.users[0]
        newInfo.nickname = newName
        newInfo.school = school
        newInfo.major = major
        newInfo.concentration = concentration
        newInfo.grad_year = parseFloat(gradYear)
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
              grad_year: parseFloat(gradYear),
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
            value={school}
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
            value={major}
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
            label="Graduation Year"
            fullWidth
            value={gradYear}
            onChange={handleGradYearChange}>
            {gradYears.map((option) => (
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
