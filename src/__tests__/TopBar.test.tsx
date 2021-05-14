import React from 'react'
import { render } from '@testing-library/react'
import TopBar from '../components/Top/TopBar'
import { useAuth0 } from '../utils/react-auth0-spa'
import { mockAuthUser, mockUserContext } from '../static/mocks'
import { UserContext } from '../context/UserContext'

jest.mock('../utils/react-auth0-spa')

describe('Top Bar', () => {
  beforeEach(() => {
    // Swap between isAuthenticated false and true
    ;(useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      loading: true,
      mockAuthUser,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    })
  })

  test('Renders Text in Top Bar Without Crashing', () => {
    const { getByText } = render(
      <UserContext.Provider value={mockUserContext}>
        <TopBar />
      </UserContext.Provider>,
    )

    expect(getByText(/hyperplanner/i)).toBeInTheDocument()
    expect(getByText(/freshman/i)).toBeInTheDocument()
    expect(getByText(/sophomore/i)).toBeInTheDocument()
    expect(getByText(/junior/i)).toBeInTheDocument()
    expect(getByText(/senior/i)).toBeInTheDocument()
    expect(getByText(/help/i)).toBeInTheDocument()
    expect(getByText(/github/i)).toBeInTheDocument()
    expect(getByText(/log in/i)).toBeInTheDocument()
  })
})
