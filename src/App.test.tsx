import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

// Necessary to prevent unit testing ReactGA errors
jest.mock('react-ga')

test('renders text', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/the beginning of hyperplanner/i)
  expect(linkElement).toBeInTheDocument()
})
