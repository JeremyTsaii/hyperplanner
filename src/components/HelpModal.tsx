import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import Course from './Course'
import {
  Course as CourseType,
  demoColorCourses,
  demoInitialsCourses,
} from '../static/infoLists'

const useStyles = makeStyles((theme) => ({
  helpButton: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: '#23252e',
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
      <Typography color="primary" variant="h5">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          color="primary"
          className={dialogClasses.closeButton}>
          <CloseIcon color="primary" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
}

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: '#23252e',
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    background: '#23252e',
  },
}))(MuiDialogActions)

const HelpModal = (): JSX.Element => {
  const classes = useStyles()

  // Opening/Closing modal
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.helpButton}
        startIcon={<HelpOutlineIcon />}
        onClick={handleOpen}>
        Help
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle onClose={handleClose}>Helpful Information</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" color="secondary">
            Course Color Types
          </Typography>
          {demoColorCourses.map((course: CourseType) => (
            <Course
              key={course.term + course.code}
              code={course.code}
              title={course.title}
              credits={course.credits}
              type={course.type}
              campus={course.campus}
              writInten={course.writ_inten}
              term={course.term}
              showIcons={false}
              majorChecks=""
              coreChecks=""
              school=""
              id=""
            />
          ))}
          <Typography variant="h6" color="secondary">
            Course Initials Types
          </Typography>
          {demoInitialsCourses.map((course: CourseType) => (
            <Course
              key={course.term + course.code}
              code={course.code}
              title={course.title}
              credits={course.credits}
              type={course.type}
              campus={course.campus}
              writInten={course.writ_inten}
              term={course.term}
              showIcons={false}
              majorChecks=""
              coreChecks=""
              school=""
              id=""
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Okay, Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default HelpModal
