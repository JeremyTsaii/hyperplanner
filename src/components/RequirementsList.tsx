import React from 'react'
import List from '@material-ui/core/List'
import RequirementsListItem from './RequirementsListItem'

interface IProps {
  reqs: { code: string; title: string }[]
  checksArr: number[]
}

const RequirementsList = ({ reqs, checksArr }: IProps): JSX.Element => {
  return (
    <List dense>
      {reqs.map((req, i) => {
        return <RequirementsListItem req={req} i={i} reqStatus={checksArr[i]} />
      })}
    </List>
  )
}

export default RequirementsList
