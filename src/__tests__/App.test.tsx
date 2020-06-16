import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
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

;(useAuth0 as jest.Mock).mockReturnValue({
  isAuthenticated: true,
  loading: false,
  user,
  logout: jest.fn(),
  loginWithRedirect: jest.fn(),
})
describe('App', () => {
  test('Renders App Without Crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })
  test('Renders Text in App', () => {
    const { getByText } = render(<App />)

    const text = getByText(/hyperplanner/i)
    expect(text).toBeInTheDocument()
  })
})
