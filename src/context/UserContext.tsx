import React, { createContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_INFO_QUERY } from '../utils/gqlQueries'

interface ProviderProps {
  children: React.ReactNode
}

// eslint-disable-next-line
export const UserContext = createContext({} as any)

export const UserContextProvider = ({
  children,
}: ProviderProps): JSX.Element => {
  const { loading, error, data } = useQuery(GET_INFO_QUERY)

  return (
    <UserContext.Provider value={{ loading, error, data }}>
      {children}
    </UserContext.Provider>
  )
}
