import React from 'react'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  copyButton: {
    textTransform: 'none',
  },
}))

interface saveProps {
  handleSave(): void
  text: string
}

function SaveButton({ handleSave, text }: saveProps): JSX.Element {
  const classes = useStyles()

  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.copyButton}
      startIcon={<SaveAltIcon />}
      onClick={handleSave}>
      {text}
    </Button>
  )
}

export default SaveButton
