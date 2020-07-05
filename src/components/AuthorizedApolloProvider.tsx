import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import ReactLoading from 'react-loading'
import Particles from 'react-tsparticles'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '../utils/react-auth0-spa'
import { GRAPHQL_URL } from '../utils/auth_config.json'

interface IProps {
  children: React.ReactNode
}

const useStyles = makeStyles(() => ({
  loadingStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
    width: '100vw',
    height: '100vh',
  },
}))

// https://github.com/auth0-samples/auth0-javascript-samples/issues/79
const AuthorizedApolloProvider = ({ children }: IProps): JSX.Element => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0()
  const classes = useStyles()

  if (loading) {
    return (
      <div className={classes.loadingStyle}>
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
              collisions: {
                enable: true,
              },
            },
          }}
        />
        <ReactLoading
          type="spinningBubbles"
          color="#f50057"
          height="10%"
          width="10%"
        />
      </div>
    )
  }
  const apolloClient = new ApolloClient({
    uri: GRAPHQL_URL,
    request: async (operation) => {
      // Get token or get refreshed token
      const token = isAuthenticated ? await getTokenSilently() : null
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  })

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default AuthorizedApolloProvider
