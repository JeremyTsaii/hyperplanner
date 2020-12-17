import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  instructions: {
    color: '#f50057',
  },
  link: {
    color: '#FFF',
    '&:hover': {
      color: '#00e676',
    },
  },
}))

function ImportHyper(): JSX.Element {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.instructions}>
        <p>Instructions:</p>
        <p>
          - Go to{' '}
          <a
            className={classes.link}
            href="https://hyperschedule.io/"
            target="_blank"
            rel="noreferrer">
            Hyperschedule
          </a>{' '}
          and click &quot;<b>Import/ExportData</b>&quot;
        </p>
        <p>
          - <b>Copy and paste</b> the JSON into the field below to easily
          transfer your planned courses
        </p>
      </div>
    </div>
  )
}

export default ImportHyper
