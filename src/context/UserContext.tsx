import React, { createContext } from 'react'
/* eslint-disable */
import { useGet_InfoQuery } from '../generated/graphql'
/* eslint-enable */

interface ProviderProps {
  children: React.ReactNode
}

// eslint-disable-next-line
export const UserContext = createContext({} as any)

export const UserContextProvider = ({
  children,
}: ProviderProps): JSX.Element => {
  const { loading, error, data } = useGet_InfoQuery()

  return (
    <UserContext.Provider value={{ loading, error, data }}>
      {children}
    </UserContext.Provider>
  )
}
