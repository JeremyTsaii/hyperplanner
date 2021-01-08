import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  text: {
    color: 'white',
    width: theme.spacing(85),
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#01413c !important',
    },
    backgroundColor: '#012e2a',
  },
}))

interface LIProps {
  req: { code: string; title: string }
  i: number
  reqStatus: number
}

const RequirementsListItem = ({ req, i, reqStatus }: LIProps): JSX.Element => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
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
  )
}

export default RequirementsListItem
