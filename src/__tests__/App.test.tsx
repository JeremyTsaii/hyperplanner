import React from 'react'
import { render, act } from '@testing-library/react'
import App from '../App'
import { useAuth0 } from '../utils/react-auth0-spa'

jest.mock('react-ga')
jest.mock('../utils/react-auth0-spa')

// Create dummy user profile
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
}

describe('App', () => {
  beforeEach(() => {
    ;(useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    })
  })

  test('Renders App Without Crashing', async () => {
    await act(async () => {
      render(<App />)
    })
  })
  test('Renders Text in App', async () => {
    await act(async () => {
      const { getByText } = render(<App />)
      expect(getByText(/hyperplanner/i)).toBeInTheDocument()
    })
  })
})
