import React from 'react'
import { render } from '@testing-library/react'
import LoginButton from '../components/Top/LoginButton'
import { useAuth0 } from '../utils/react-auth0-spa'
import { mockAuthUser } from '../static/mocks'

jest.mock('../utils/react-auth0-spa')

describe('Login Button', () => {
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

  test('Renders Text in Login Button Without Crashing', () => {
    const { getByText } = render(<LoginButton />)
    expect(getByText(/log in/i)).toBeInTheDocument()
  })
})

describe('Logout Button', () => {
  beforeEach(() => {
    // Swap between isAuthenticated false and true
    ;(useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      loading: false,
      mockAuthUser,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    })
  })

  test('Renders Text in Logout Button Without Crashing', () => {
    const { getByText } = render(<LoginButton />)
    expect(getByText(/log out/i)).toBeInTheDocument()
  })
})
