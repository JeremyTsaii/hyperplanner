import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import CloseIcon from '@material-ui/icons/Close'
import { Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import AllCourses from '../static/allCourses.json'

const useStyles = makeStyles((theme) => ({
  text: {
    color: 'white',
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: theme.palette.info.dark,
  },
  subtitle: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    background: theme.palette.info.dark,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.warning.main,
  },
  listItem: {
    '&:hover': {
      backgroundColor: `${theme.palette.secondary.dark} !important`,
    },
    backgroundColor: theme.palette.info.light,
  },
}))

interface DialogTitleProps {
  onClose: () => void
  reqTitle: string
}

const DialogTitle = ({ onClose, reqTitle }: DialogTitleProps) => {
  const classes = useStyles()

  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography color="primary" variant="h6">
        {reqTitle}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          color="primary"
          className={classes.closeButton}>
          <CloseIcon color="primary" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
}

const DialogContent = withStyles(
  (theme) => ({
    root: {
      background: theme.palette.info.dark,
    },
  }),
  { withTheme: true },
)(MuiDialogContent)

interface LIProps {
  req: { code: string; title: string }
  i: number
  reqStatus: number
}

const RequirementsListItem = ({ req, i, reqStatus }: LIProps): JSX.Element => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const codeList = req.code.split('/')
  const titleList = new Array<string>(codeList.length)

  AllCourses.forEach((course) => {
    const codeIndex = codeList.indexOf(course.code)
    if (codeIndex > -1) {
      titleList[codeIndex] = course.title
    }
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <ListItem
        // eslint-disable-next-line
        key={req.code + i + req.title}
        button
        onClick={handleOpen}
        className={classes.listItem}>
        <ListItemText
          disableTypography
          primary={
            <Typography className={classes.text} noWrap>
              <b>{req.code}</b>: {req.title}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <Checkbox
            key={`${req.code + i + req.title}checkbox`}
            disableRipple
            edge="end"
            onChange={undefined}
            checked={reqStatus === 1 || reqStatus === 2}
            color={reqStatus === 2 ? 'secondary' : 'default'}
            style={{ cursor: 'default' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        open={open}
        aria-labelledby="customized-dialog-title">
        <DialogTitle onClose={handleClose} reqTitle={req.title} />
        <Typography color="secondary" className={classes.subtitle}>
          <i>Requirement fulfilled by:</i>
        </Typography>
        <DialogContent>
          <List dense>
            {codeList.map((code, k) => {
              return (
                // eslint-disable-next-line
                <ListItem key={`${code}${k}`}>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography className={classes.text} noWrap>
                        {k + 1}. <b>{code}</b> {titleList[k]}
                      </Typography>
                    }
                  />
                </ListItem>
              )
            })}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RequirementsListItem
