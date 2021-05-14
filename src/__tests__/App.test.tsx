import React from 'react'
import { render, act } from '@testing-library/react'
import App from '../App'
import { useAuth0 } from '../utils/react-auth0-spa'
import { mockUser } from '../static/mocks'

jest.mock('react-ga')
jest.mock('../utils/react-auth0-spa')

describe('App', () => {
  beforeEach(() => {
    ;(useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      loading: false,
      mockUser,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    })
  })

  test('Renders Text in App', async () => {
    await act(async () => {
      const { getByText } = render(<App />)
      expect(getByText(/hyperplanner/i)).toBeInTheDocument()
      expect(getByText(/help/i)).toBeInTheDocument()
      expect(getByText(/github/i)).toBeInTheDocument()
      expect(getByText(/log out/i)).toBeInTheDocument()
    })
  })
})
