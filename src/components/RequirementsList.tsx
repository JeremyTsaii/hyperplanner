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
  coreChecks?: string
  activeCoreChecksArr?: number[]
  enroll?: number
  majorChecks?: string
  activeMajorChecksArr?: number[]
  major?: string
  isMajor: boolean
}

const RequirementsList = ({
  reqs,
  coreChecks,
  activeCoreChecksArr,
  enroll,
  majorChecks,
  activeMajorChecksArr,
  major,
  isMajor,
}: IProps): JSX.Element => {
  const classes = useStyles()

  let jsonChecks = {}
  let key = '' as keyof typeof jsonChecks

  /* eslint-disable */
  if (isMajor) {
    jsonChecks = JSON.parse(majorChecks!) as JSON
    key = major! as keyof typeof jsonChecks
  } else {
    jsonChecks = JSON.parse(coreChecks!) as JSON
    if (enroll! > 2018) {
      key = 'post' as keyof typeof jsonChecks
    } else {
      key = 'pre' as keyof typeof jsonChecks
    }
  }
  /* eslint-enable */

  const arr = jsonChecks[key] as number[]
  let activeArr = arr
  if (isMajor && activeMajorChecksArr) {
    activeArr = activeMajorChecksArr
  } else if (!isMajor && activeCoreChecksArr) {
    activeArr = activeCoreChecksArr
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
                checked={arr[i] === 1}
                color={activeArr[i] === 1 ? 'primary' : 'default'}
              />
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

RequirementsList.defaultProps = {
  coreChecks: '',
  activeCoreChecksArr: [],
  enroll: 0,
  majorChecks: '',
  activeMajorChecksArr: [],
  major: '',
}

export default RequirementsList
