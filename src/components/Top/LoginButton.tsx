import React from 'react'
import Button from '@material-ui/core/Button'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '../../utils/react-auth0-spa'

const useStyles = makeStyles((theme) => ({
  logButton: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '110%',
    },
  },
}))

function LoginButton(): JSX.Element {
  const { isAuthenticated, loginWithPopup, logout } = useAuth0()
  const classes = useStyles()

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={isAuthenticated ? () => logout() : () => loginWithPopup({})}
        className={classes.logButton}
        startIcon={<PersonOutlineIcon />}>
        {isAuthenticated ? 'Log Out' : 'Log In'}
      </Button>
    </div>
  )
}

export default LoginButton
