import React, { useState } from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  uploadButton: {
    textTransform: 'none',
  },
}))

function UploadButton(): JSX.Element {
  const classes = useStyles()
  const [status, setStatus] = useState('Upload')

  const handleUpload = () => {
    setStatus('Uploading...')
  }

  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.uploadButton}
      startIcon={<CloudUploadIcon />}
      onClick={handleUpload}>
      {status}
    </Button>
  )
}

export default UploadButton
