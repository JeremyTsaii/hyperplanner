import React from 'react'
import Button from '@material-ui/core/Button'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  loginButton: {
    marginRight: theme.spacing(1),
  },
}))

function LoginButton(): JSX.Element {
  const classes = useStyles()

  return (
    <Button
      variant="outlined"
      color="secondary"
      className={classes.loginButton}
      startIcon={<PersonOutlineIcon />}>
      Login
    </Button>
  )
}

export default LoginButton
