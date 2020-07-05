import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  text: {
    color: 'white',
  },
}))

interface IProps {
  reqs: { code: string; title: string }[]
}

const RequirementsList = ({ reqs }: IProps): JSX.Element => {
  const classes = useStyles()

  const [checked, setChecked] = useState([] as number[])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <List dense>
      {reqs.map((req, i) => {
        return (
          // eslint-disable-next-line
          <ListItem key={req.code + i + req.title} button>
            <ListItemText
              disableTypography
              primary={
                <Typography className={classes.text}>
                  {`${req.code}: ${req.title}`}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(i)}
                checked={checked.indexOf(i) !== -1}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

export default RequirementsList
