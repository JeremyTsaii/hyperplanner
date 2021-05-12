import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogActions from '@material-ui/core/DialogActions'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ExportJson from './ExportJson'
import ImportJson from './ImportJson'
import ImportTranscript from './ImportTranscript'
import ImportHyper from './ImportHyper'

const useStyles = makeStyles((theme) => ({
  importButton: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: theme.palette.info.dark,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.warning.main,
  },
  tab: {
    backgroundColor: theme.palette.info.dark,
    color: 'white',
  },
}))

const DialogActions = withStyles(
  (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
      background: theme.palette.info.dark,
    },
  }),
  { withTheme: true },
)(MuiDialogActions)

const DialogContent = withStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(2),
      background: theme.palette.info.dark,
    },
  }),
  { withTheme: true },
)(MuiDialogContent)

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
  switch (value) {
    case 0:
      activeTab = <ImportTranscript />
      break
    case 1:
      activeTab = <ImportHyper />
      break
    case 2:
      activeTab = <ImportJson />
      break
    case 3:
      activeTab = <ExportJson />
      break
    default:
      activeTab = <ImportTranscript />
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
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
