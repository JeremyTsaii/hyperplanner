import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Layout from './components/layout'
import './App.css'
import TopBar from './components/topBar'
import Info from './components/info'
import Cards from './components/cards'

const useStyles = makeStyles(() => ({}))

function App(): JSX.Element {
  const classes = useStyles()

  return (
    <Layout>
      <div className="App">
        <TopBar />
        <Info />
        <Cards />
      </div>
    </Layout>
  )
}

export default App
