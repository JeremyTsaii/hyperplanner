import React, { createContext } from 'react'
/* eslint-disable */
import { useGet_CoursesQuery } from '../generated/graphql'
/* eslint-enable */

interface ProviderProps {
  children: React.ReactNode
}

// eslint-disable-next-line
export const CoursesContext = createContext({} as any)

export const CoursesContextProvider = ({
  children,
}: ProviderProps): JSX.Element => {
  const { loading, error, data } = useGet_CoursesQuery()

  return (
    <CoursesContext.Provider value={{ loading, error, data }}>
      {children}
    </CoursesContext.Provider>
  )
}
