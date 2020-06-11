import React from 'react'
import Button from '@material-ui/core/Button'
import GitHubIcon from '@material-ui/icons/GitHub'

function GitButton(): JSX.Element {
  return (
    <Button
      variant="outlined"
      color="secondary"
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
