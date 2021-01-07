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
  CourseType,
  demoShadeCourses,
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
    background: '#191b21',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  link: {
    color: '#2196f3',
    '&:hover': {
      color: '#673ab7',
    },
  },
  header: {
    paddingTop: theme.spacing(2),
  },
  resource: {
    paddingLeft: theme.spacing(2),
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
    background: '#191b21',
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    background: '#191b21',
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
          <Typography variant="h6" color="primary" className={classes.header}>
            Helpful Resources
          </Typography>
          <Typography variant="subtitle1" color="primary">
            - Core Requirements:
          </Typography>
          <div className={classes.resource}>
            <a
              className={classes.link}
              href="http://catalog.hmc.edu/content.php?catoid=14&navoid=701
            "
              target="_blank"
              rel="noreferrer">
              - Core Catalog
            </a>
          </div>
          <Typography variant="subtitle1" color="primary">
            - Major Requirements:
          </Typography>
          <div className={classes.resource}>
            <a
              className={classes.link}
              href="https://www.hmc.edu/academics/majors-at-harvey-mudd/"
              target="_blank"
              rel="noreferrer">
              - Mudd Majors
            </a>
          </div>
          <Typography variant="subtitle1" color="primary">
            - HSA Requirements:
          </Typography>
          <div className={classes.resource}>
            <a
              className={classes.link}
              href="https://www.hmc.edu/hsa/curriculum/graduation-requirements/
            "
              target="_blank"
              rel="noreferrer">
              - HSA Curriculum
            </a>
          </div>
          <div className={classes.resource}>
            <a
              className={classes.link}
              href="https://www.hmc.edu/hsa/wp-content/uploads/sites/25/2019/11/Concept-Map-of-Requirements-110619.pdf
            "
              target="_blank"
              rel="noreferrer">
              - HSA Concept Map
            </a>
          </div>
          <Typography variant="h6" color="primary" className={classes.header}>
            Course Shade Types
          </Typography>
          {demoShadeCourses.map((course: CourseType) => (
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
              active={course.active}
            />
          ))}
          <Typography variant="h6" color="primary" className={classes.header}>
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
              active={course.active}
            />
          ))}
          <Typography variant="h6" color="primary" className={classes.header}>
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
              active={course.active}
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
