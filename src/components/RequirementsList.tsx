import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
/* eslint-disable */
import {
  useUpdate_Major_ChecksMutation,
  useUpdate_Core_ChecksMutation,
  Get_InfoDocument,
  Get_InfoQuery,
} from '../generated/graphql'
/* eslint-enable */

const useStyles = makeStyles(() => ({
  text: {
    color: 'white',
  },
}))

interface IProps {
  reqs: { code: string; title: string }[]
  id: string
  coreChecks?: string
  enroll?: number
  majorChecks?: string
  major?: string
  isMajor: boolean
}

const RequirementsList = ({
  reqs,
  id,
  coreChecks,
  enroll,
  majorChecks,
  major,
  isMajor,
}: IProps): JSX.Element => {
  const classes = useStyles()

  const [updateMajorChecks] = useUpdate_Major_ChecksMutation()
  const [updateCoreChecks] = useUpdate_Core_ChecksMutation()

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

  const handleToggle = (index: number) => () => {
    const currentIndex = arr[index]
    if (currentIndex === 0) {
      // Check off
      arr[index] = 1
    } else {
      // Uncheck
      arr[index] = 0
    }

    const newChecks = JSON.stringify(jsonChecks)

    if (isMajor) {
      updateMajorChecks({
        variables: {
          id,
          majorChecks: newChecks,
        },
        update(cache) {
          /* eslint-disable */
          const existingInfo = cache.readQuery<Get_InfoQuery>({
            query: Get_InfoDocument,
          })
          const newInfo = { ...existingInfo!.users[0] }
          newInfo.majorChecks = newChecks
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
                majorChecks: newChecks,
              },
            ],
          },
        },
      })
    } else {
      updateCoreChecks({
        variables: {
          id,
          coreChecks: newChecks,
        },
        update(cache) {
          /* eslint-disable */
          const existingInfo = cache.readQuery<Get_InfoQuery>({
            query: Get_InfoDocument,
          })
          const newInfo = { ...existingInfo!.users[0] }
          newInfo.coreChecks = newChecks
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
                coreChecks: newChecks,
              },
            ],
          },
        },
      })
    }
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
                edge="end"
                onChange={handleToggle(i)}
                checked={arr[i] === 1}
                color="primary"
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
  enroll: 0,
  majorChecks: '',
  major: '',
}

export default RequirementsList
