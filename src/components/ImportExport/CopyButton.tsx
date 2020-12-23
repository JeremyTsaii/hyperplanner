import React, { useState } from 'react'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  copyButton: {
    textTransform: 'none',
  },
}))

interface copyProps {
  text: string
}

function CopyButton({ text }: copyProps): JSX.Element {
  const classes = useStyles()
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopySuccess(true)
  }

  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.copyButton}
      startIcon={<FileCopyIcon />}
      onClick={copyToClipboard}>
      {copySuccess ? 'Copied' : 'Copy'}
    </Button>
  )
}

export default CopyButton
