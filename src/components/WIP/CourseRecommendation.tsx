import React, { useState, useContext } from 'react'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Autocomplete } from '@material-ui/lab'
import { modifyChecklist } from '../../utils/modalFunctions'
import AllCourses from '../../static/allCourses.json'
import { types, bools, courseSort } from '../../static/infoLists'

interface courseProps {
  code: string
  title: string
  credits: number
  type: string
  campus: string
  writInten: boolean
  term: string
  showIcons: boolean
}

const recommendation = (
  coreChecks: any,
  majorChecks: any,
  major: string,
): courseProps[] => {
  return []
}
