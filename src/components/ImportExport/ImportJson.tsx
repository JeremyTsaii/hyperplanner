import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  instructions: {
    color: '#f50057',
  },
}))

function ImportJson(): JSX.Element {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.instructions}>
        <p>Instructions:</p>
        <p>
          - <b>Copy and paste</b> the JSON from the &quot;Export JSON&quot;
          field of another account into the field below to easily transfer/share
          your courses
        </p>
      </div>
    </div>
  )
}

export default ImportJson
