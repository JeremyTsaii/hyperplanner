import React from 'react'
import Button from '@material-ui/core/Button'
import GitHubIcon from '@material-ui/icons/GitHub'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  gitButton: {
    marginRight: theme.spacing(1),
  },
}))

function GitButton(): JSX.Element {
  const classes = useStyles()

  return (
    <Button
      variant="outlined"
      color="secondary"
      className={classes.gitButton}
      startIcon={<GitHubIcon />}
      onClick={() =>
        window.open(
          'https://github.com/JeremyTsaii/hyperplanner',
          '_blank',
          'noopener, noreferrer',
        )
      }>
      GitHub
    </Button>
  )
}

export default GitButton
