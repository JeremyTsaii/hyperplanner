import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogActions from '@material-ui/core/DialogActions'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ExportJson from './ImportExport/ExportJson'
import ImportJson from './ImportExport/ImportJson'
import ImportTranscript from './ImportExport/ImportTranscript'
import ImportHyper from './ImportExport/ImportHyper'

const useStyles = makeStyles((theme) => ({
  importButton: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: '#23252e',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  tab: {
    backgroundColor: '#23252e',
    color: 'white',
  },
}))

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    background: '#23252e',
  },
}))(MuiDialogActions)

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: '#23252e',
  },
}))(MuiDialogContent)

const ImportExportModal = (): JSX.Element => {
  const classes = useStyles()

  // Opening/Closing modal
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // Setting active tabs
  const [value, setValue] = React.useState(0)

  /* eslint-disable-next-line */
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  // Change what is displayed, depending on which tab is active
  let activeTab = {}
  if (value === 0) {
    activeTab = <ImportTranscript />
  } else if (value === 1) {
    activeTab = <ImportHyper />
  } else if (value === 2) {
    activeTab = <ImportJson />
  } else if (value === 3) {
    activeTab = <ExportJson />
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.importButton}
        startIcon={<ImportExportIcon />}
        onClick={handleOpen}>
        Import/Export
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="simple tabs example"
          variant="fullWidth">
          <Tab label="Import Transcript" className={classes.tab} />
          <Tab label="Import Hyperschedule" className={classes.tab} />
          <Tab label="Import Json" className={classes.tab} />
          <Tab label="Export JSON" className={classes.tab} />
        </Tabs>
        <DialogContent dividers>{activeTab}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Done.
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ImportExportModal
