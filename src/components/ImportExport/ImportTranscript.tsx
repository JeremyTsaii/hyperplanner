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

function ImportTranscript(): JSX.Element {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.instructions}>
        <p>Instructions:</p>
        <p>
          - Go to{' '}
          <a
            className={classes.link}
            href="https://portal.hmc.edu/ICS/"
            target="_blank"
            rel="noreferrer">
            Portal
          </a>
          , log in, and click the &quot;<b>Transcripts</b>&quot; tab
        </p>
        <p>
          - Click &quot;<b>View Unofficial Transcript</b>&quot;
        </p>
        <p>
          - Click the print button in the top right corner and select &quot;
          <b>Save as PDF</b>&quot;
        </p>
        <p>
          - This linear view provides better text extraction than the normal
          side-by-side transcript
        </p>
        <p>
          - <b>Upload</b> the PDF below&#013;
        </p>
        <p>
          - Don&apos;t worry, uploading is required for transcript text
          extraction but all files are deleted after extraction has completed
        </p>
        <p> - Have questions/concerns? Feel free to email jetsai@hmc.edu</p>
      </div>
    </div>
  )
}

export default ImportTranscript
