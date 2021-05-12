import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import Layout from './components/GALayout'
import './App.css'
import { UserContextProvider } from './context/UserContext'
import { CoursesContextProvider } from './context/CoursesContext'
import { StatsContextProvider } from './context/StatsContext'
import TopBar from './components/Top/TopBar'
import InfoCards from './components/Middle/InfoCards'
import YearCards from './components/Bottom/YearCards'
import AuthorizedApolloProvider from './components/AuthorizedApolloProvider'

const mainTheme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 1110,
      lg: 1550,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#BB86FC',
      dark: '#673ab7',
    },
    secondary: {
      main: '#03DAC5',
      dark: '#01413c',
    },
    // Background colors
    info: {
      main: '#121212',
      dark: '#191b21',
      light: '#012e2a', // Secondary background
    },
    // Close buttons old color
    warning: {
      main: grey[500],
    },
    // Links
    success: {
      main: '#2196f3',
    },
  },
})

function App(): JSX.Element {
  return (
    <ThemeProvider theme={mainTheme}>
      <AuthorizedApolloProvider>
        <Layout>
          <div className="App">
            <UserContextProvider>
              <CoursesContextProvider>
                <StatsContextProvider>
                  <TopBar />
                  <InfoCards />
                  <YearCards />
                </StatsContextProvider>
              </CoursesContextProvider>
            </UserContextProvider>
          </div>
        </Layout>
      </AuthorizedApolloProvider>
    </ThemeProvider>
  )
}

export default App
