import React, { createContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_COURSES_QUERY } from '../utils/gqlQueries'

interface ProviderProps {
  children: React.ReactNode
}

// eslint-disable-next-line
export const CoursesContext = createContext({} as any)

export const CoursesContextProvider = ({
  children,
}: ProviderProps): JSX.Element => {
  const { loading, error, data } = useQuery(GET_COURSES_QUERY)

  return (
    <CoursesContext.Provider value={{ loading, error, data }}>
      {children}
    </CoursesContext.Provider>
  )
}
