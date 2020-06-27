import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Layout from './components/GALayout'
import './App.css'
import TopBar from './components/TopBar'
import InfoCards from './components/InfoCards'
import YearCards from './components/YearCards'
import AuthorizedApolloProvider from './components/AuthorizedApolloProvider'

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
  return (
    <AuthorizedApolloProvider>
      <ThemeProvider theme={mainTheme}>
        <Layout>
          <div className="App">
            <TopBar />
            <InfoCards />
            <YearCards />
          </div>
        </Layout>
      </ThemeProvider>
    </AuthorizedApolloProvider>
  )
}

export default App
