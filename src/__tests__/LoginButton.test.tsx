import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import LoginButton from '../components/loginButton'
import { useAuth0 } from '../utils/react-auth0-spa'

jest.mock('../utils/react-auth0-spa')

// Create dummy user profile
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
}

// Swap between isAuthenticated false and true
;(useAuth0 as jest.Mock)
  .mockReturnValue({
    isAuthenticated: false,
    loading: false,
    user,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
  })
  .mockReturnValueOnce({
    isAuthenticated: true,
    loading: false,
    user,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
  })

describe('Login Button', () => {
  test('Renders Login Button Without Crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<LoginButton />, div)
  })
  test('Renders Text in Login Button', () => {
    const { getByText } = render(<LoginButton />)

    const text = getByText(/log in/i)
    expect(text).toBeInTheDocument()
  })
  test('Renders Text in Logout Button', () => {
    const { getByText } = render(<LoginButton />)

    const text = getByText(/log in/i)
    expect(text).toBeInTheDocument()
  })
})
