import React from 'react'
import { render } from '@testing-library/react'
import LoginButton from '../components/LoginButton'
import { useAuth0 } from '../utils/react-auth0-spa'

jest.mock('../utils/react-auth0-spa')

// Create dummy user profile
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
}

describe('Login Button', () => {
  beforeEach(() => {
    // Swap between isAuthenticated false and true
    ;(useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      loading: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    })
  })

  test('Renders Login Button Without Crashing', () => {
    render(<LoginButton />)
  })
  test('Renders Text in Login Button', () => {
    const { getByText } = render(<LoginButton />)
    expect(getByText(/log in/i)).toBeInTheDocument()
  })
})

describe('Logout Button', () => {
  beforeEach(() => {
    // Swap between isAuthenticated false and true
    ;(useAuth0 as jest.Mock).mockReturnValueOnce({
      isAuthenticated: true,
      loading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    })
  })

  test('Renders Logout Button Without Crashing', () => {
    render(<LoginButton />)
  })
  test('Renders Text in Logout Button', () => {
    const { getByText } = render(<LoginButton />)
    expect(getByText(/log out/i)).toBeInTheDocument()
  })
})
