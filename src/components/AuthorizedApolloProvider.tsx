import React from 'react'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import ReactLoading from 'react-loading'
import Particles from 'react-tsparticles'
import { makeStyles, useTheme } from '@material-ui/core/styles'
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
    backgroundColor: '#121212',
    width: '100vw',
    height: '100vh',
  },
}))

// https://github.com/auth0-samples/auth0-javascript-samples/issues/79
const AuthorizedApolloProvider = ({ children }: IProps): JSX.Element => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0()
  const classes = useStyles()
  const theme = useTheme()

  if (loading) {
    return (
      <div className={classes.loadingStyle}>
        <Particles
          params={{
            fps_limit: 60,
            background: {
              color: '#121212',
            },
            particles: {
              links: {
                enable: true,
                color: theme.palette.primary.main,
              },
              move: {
                enable: false,
              },
              size: {
                value: 3,
              },
              opacity: {
                value: 0.5,
              },
              color: {
                value: theme.palette.secondary.main,
              },
            },
          }}
        />
        <ReactLoading
          type="spinningBubbles"
          color={theme.palette.primary.main}
          height="10%"
          width="10%"
        />
      </div>
    )
  }

  const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
  })

  const authLink = setContext(async () => {
    const token = isAuthenticated ? await getTokenSilently() : null
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default AuthorizedApolloProvider
