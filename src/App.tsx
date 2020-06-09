import React from 'react'
import Button from '@material-ui/core/Button'
import GitHubIcon from '@material-ui/icons/GitHub'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import Layout from './layout'
import logo from './logo.svg'
import './App.css'

function App(): JSX.Element {
  return (
    <Layout>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>The beginning of HyperPlanner (coming soon)!</p>
          <LoginButton />
          <GitButton />
        </header>
      </div>
    </Layout>
  )
}

function LoginButton(): JSX.Element {
  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<PersonOutlineIcon />}>
      Login
    </Button>
  )
}

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

export default App
