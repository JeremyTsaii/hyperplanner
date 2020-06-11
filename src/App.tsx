import React from 'react'
import Layout from './components/layout'
import './App.css'
import TopBar from './components/topBar'
import Info from './components/info'
import Cards from './components/cards'

function App(): JSX.Element {
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
