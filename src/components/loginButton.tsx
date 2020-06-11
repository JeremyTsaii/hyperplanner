import React from 'react'
import Button from '@material-ui/core/Button'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'

function LoginButton(): JSX.Element {
  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<PersonOutlineIcon />}>
      Login
    </Button>
  )
}

export default LoginButton
