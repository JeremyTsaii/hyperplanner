import React from 'react'
import Button from '@material-ui/core/Button'
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined'
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
      startIcon={<GetAppOutlinedIcon />}>
      Download
    </Button>
  )
}

export default DownloadButton
