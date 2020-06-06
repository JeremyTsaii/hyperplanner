import React from 'react'
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
        </header>
      </div>
    </Layout>
  )
}

export default App
