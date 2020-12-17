import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  instructions: {
    color: '#f50057',
  },
}))

function ExportJson(): JSX.Element {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.instructions}>
        <p>Instructions:</p>
        <p>
          - <b>Copy and paste</b> this JSON into the &quot;Import JSON&quot;
          field of another account to easily transfer/share your courses
        </p>
      </div>
    </div>
  )
}

export default ExportJson
