import React from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  uploadButton: {
    textTransform: 'none',
  },
}))

interface uploadProps {
  text: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function UploadButton({ text, onChange }: uploadProps): JSX.Element {
  const classes = useStyles()

  return (
    <Button
      variant="outlined"
      color="primary"
      component="label"
      className={classes.uploadButton}
      startIcon={<CloudUploadIcon />}>
      <input accept=".pdf" type="file" hidden onChange={onChange} />
      {text}
    </Button>
  )
}

export default UploadButton
