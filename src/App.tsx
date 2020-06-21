import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Layout from './components/layout'
import './App.css'
import TopBar from './components/topBar'
import Info from './components/info'
import Cards from './components/cards'
import { useAuth0 } from './utils/react-auth0-spa'

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF0325',
    },
    secondary: {
      main: '#fff',
    },
  },
})

function App(): JSX.Element {
  const { loading } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Layout>
        <div className="App">
          <TopBar />
          <Info
            firstName="Jeremy"
            schoolName="Bellevue College"
            majorName="CS"
            concName="Excel"
            gradYear={2045}
            totalCredits={20}
            creditsRem={47}
            avgCredit={20}
            avgRem={8}
          />
          <Cards />
        </div>
      </Layout>
    </ThemeProvider>
  )
}

export default App
