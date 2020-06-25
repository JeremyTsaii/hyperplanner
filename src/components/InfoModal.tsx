import React, { useState } from 'react'
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
import { schools, majors, concentrations, gradYears } from '../static/infoLists'

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
  editIcon: {
    alignSelf: 'end',
    left: theme.spacing(16),
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
  const classes = useStyles()

  // Opening/Closing modal
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSave = () => {
    handleClose()
  }

  // Changing information in modal
  const [school, setSchool] = useState('')

  const [major, setMajor] = useState('')

  const [concentration, setConcentration] = useState('')

  const [gradYear, setGradYear] = useState('')

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

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="edit"
        size="small"
        color="secondary"
        className={classes.editIcon}
        onClick={handleClickOpen}>
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
