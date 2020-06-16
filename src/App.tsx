import React from 'react'
import Layout from './components/layout'
import './App.css'
import TopBar from './components/topBar'
import Info from './components/info'
import Cards from './components/cards'
import { useAuth0 } from './utils/react-auth0-spa'

function App(): JSX.Element {
  const { loading } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
  }

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
