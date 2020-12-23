import React from 'react'
import Particles from 'react-tsparticles'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Layout from './components/GALayout'
import './App.css'
import { UserContextProvider } from './context/UserContext'
import { CoursesContextProvider } from './context/CoursesContext'
import { StatsContextProvider } from './context/StatsContext'
import TopBar from './components/TopBar'
import InfoCards from './components/InfoCards'
import YearCards from './components/YearCards'
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
      main: '#f50057',
    },
    secondary: {
      main: '#fff',
    },
  },
})

function App(): JSX.Element {
  return (
    <AuthorizedApolloProvider>
      <ThemeProvider theme={mainTheme}>
        <Layout>
          <div className="App">
            <Particles
              params={{
                fps_limit: 60,
                background: {
                  color: '#282c34',
                },
                particles: {
                  links: {
                    enable: true,
                    color: '#f50057',
                    distance: 185,
                  },
                  move: {
                    enable: true,
                  },
                  size: {
                    value: 3,
                  },
                  opacity: {
                    value: 0.5,
                  },
                  color: {
                    value: '#f50057',
                  },
                },
              }}
            />
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
      </ThemeProvider>
    </AuthorizedApolloProvider>
  )
}

export default App
