import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CoursesContext } from '../../context/CoursesContext'
import CopyButton from './CopyButton'

const useStyles = makeStyles((theme) => ({
  table: {
    color: '#f50057',
    display: 'table',
    borderCollapse: 'separate',
  },
  row: {
    display: 'table-row',
  },
  instructions: {
    display: 'table-cell',
  },
  copyButton: {
    display: 'table-cell',
    paddingLeft: theme.spacing(20),
  },
  json: {
    color: '#00897b',
    display: 'table-row',
    backgroundColor: '#1f2129',
  },
}))

function ExportJson(): JSX.Element {
  const classes = useStyles()
  const { data } = useContext(CoursesContext)
  const jsonStr = JSON.stringify(data.courses, null, 2)

  return (
    <div>
      <div className={classes.table}>
        <p>Instructions:</p>
        <div className={classes.row}>
          <div className={classes.instructions}>
            <p>
              - <b>Copy and paste</b> this JSON into the &quot;Import JSON&quot;
              field of another account to easily transfer/share your courses
            </p>
          </div>
          <div className={classes.copyButton}>
            {' '}
            <CopyButton text={jsonStr} />
          </div>
        </div>
      </div>
      <div className={classes.json}>{jsonStr}</div>
    </div>
  )
}

export default ExportJson
