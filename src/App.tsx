import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
<<<<<<< HEAD
import Layout from './components/layout'
=======
import Layout from './components/GALayout'
>>>>>>> 51346e6a5f21ba285eb590563ec82ff79dfeb129
import './App.css'
import TopBar from './components/TopBar'
import InfoCards from './components/InfoCards'
import YearCards from './components/YearCards'
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
<<<<<<< HEAD
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
=======
          <InfoCards
            firstName="Jeremy"
            schoolName="Harvey Mudd College"
            majorName="CS"
            concName="Economics"
            gradYear={2022}
            totalCredits={73.5}
            creditsRem={54.5}
            avgCredit={18.375}
            avgRem={13.5}
          />
          <YearCards />
>>>>>>> 51346e6a5f21ba285eb590563ec82ff79dfeb129
        </div>
      </Layout>
    </ThemeProvider>
  )
}

export default App
