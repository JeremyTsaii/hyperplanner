import React from 'react'
import { render } from '@testing-library/react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import InfoCards from '../../components/Middle/InfoCards'
import {
  mockUserContext,
  mockCoursesContext,
  mockStatsContext,
} from '../../static/mocks'
import { UserContext } from '../../context/UserContext'
import { CoursesContext } from '../../context/CoursesContext'
import { StatsContext } from '../../context/StatsContext'

describe('Top Bar', () => {
  test('Renders Text in Stepper Without Crashing', () => {
    const { getByText } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <UserContext.Provider value={mockUserContext}>
          <CoursesContext.Provider value={mockCoursesContext}>
            <StatsContext.Provider value={mockStatsContext}>
              <InfoCards />
            </StatsContext.Provider>
          </CoursesContext.Provider>
        </UserContext.Provider>
      </ApolloProvider>,
    )

    // Left Stats
    expect(getByText(/jeremy/i)).toBeInTheDocument()
    expect(getByText(/school:/i)).toBeInTheDocument()
    expect(getByText(/harvey mudd college/i)).toBeInTheDocument()
    expect(getByText(/major:/i)).toBeInTheDocument()
    expect(getByText(/computer science/i)).toBeInTheDocument()
    expect(getByText(/concentration:/i)).toBeInTheDocument()
    expect(getByText(/economics/i)).toBeInTheDocument()
    expect(getByText(/year enrolled:/i)).toBeInTheDocument()
    expect(getByText(/2018/i)).toBeInTheDocument()
    expect(getByText(/planned graduation:/i)).toBeInTheDocument()
    expect(getByText(/spring 2022/i)).toBeInTheDocument()

    // Right Stats
    expect(getByText(/humanities/i)).toBeInTheDocument()
    expect(getByText(/core/i)).toBeInTheDocument()
  })
})
