import React from 'react'
import Button from '@material-ui/core/Button'
import GetAppIcon from '@material-ui/icons/GetApp'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  downloadButton: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
}))

function DownloadButton(): JSX.Element {
  const classes = useStyles()

  return (
    <Button
      variant="outlined"
      color="secondary"
      className={classes.downloadButton}
      startIcon={<GetAppIcon />}>
      Download
    </Button>
  )
}

export default DownloadButton
