import React from 'react'
import { ApolloProvider } from '@apollo/react-common'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { useAuth0 } from '../utils/react-auth0-spa'
import { GRAPHQL_URL } from '../utils/auth_config.json'

interface IProps {
  children: React.ReactNode
}

// https://github.com/auth0-samples/auth0-javascript-samples/issues/79
const AuthorizedApolloProvider = ({ children }: IProps) => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
  }
  const client = new ApolloClient({
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
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AuthorizedApolloProvider
