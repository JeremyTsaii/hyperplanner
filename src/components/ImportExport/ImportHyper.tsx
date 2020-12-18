import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SaveButton from './SaveButton'

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

  const [status, setStatus] = useState('Import')

  const handleSave = () => {
    setStatus('Imported')
  }

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
          transfer your planned courses into your next semester
        </p>
      </div>
      <SaveButton text={status} handleSave={handleSave} />
    </div>
  )
}

export default ImportHyper
