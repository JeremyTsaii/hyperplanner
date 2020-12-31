import React from 'react'
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
  checksArr: number[]
}

const RequirementsList = ({ reqs, checksArr }: IProps): JSX.Element => {
  const classes = useStyles()

  return (
    <List dense>
      {reqs.map((req, i) => {
        return (
          <ListItem
            // eslint-disable-next-line
            key={req.code + i + req.title}
            button
            style={{ cursor: 'default' }}>
            <ListItemText
              disableTypography
              primary={
                <Typography className={classes.text}>
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
                checked={checksArr[i] === 1 || checksArr[i] === 2}
                color={checksArr[i] === 2 ? 'primary' : 'default'}
                style={{ cursor: 'default' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

export default RequirementsList
