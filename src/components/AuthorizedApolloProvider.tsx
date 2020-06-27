import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { useAuth0 } from '../utils/react-auth0-spa'
import { GRAPHQL_URL } from '../utils/auth_config.json'

interface IProps {
  children: React.ReactNode
}

// https://github.com/auth0-samples/auth0-javascript-samples/issues/79
const AuthorizedApolloProvider = ({ children }: IProps): JSX.Element => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
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
