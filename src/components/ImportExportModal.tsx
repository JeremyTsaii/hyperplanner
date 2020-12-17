import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogActions from '@material-ui/core/DialogActions'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

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

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props
  const classes = useStyles()

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box p={20} className={classes.tab}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

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
          <Tab label="Import JSON" className={classes.tab} />
          <Tab label="Import Transcript" className={classes.tab} />
          <Tab label="Import Hyperschedule" className={classes.tab} />
          <Tab label="Export JSON" className={classes.tab} />
        </Tabs>
        <DialogContent dividers>
          <TabPanel value={value} index={0}>
            Import JSON
          </TabPanel>
          <TabPanel value={value} index={1}>
            Import Transcript
          </TabPanel>
          <TabPanel value={value} index={2}>
            Import Hyperschedule
          </TabPanel>
          <TabPanel value={value} index={3}>
            Export JSON
          </TabPanel>
        </DialogContent>
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
