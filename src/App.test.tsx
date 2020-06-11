import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

// Necessary to prevent unit testing ReactGA errors
jest.mock('react-ga')

test('Renders HyperPlanner text', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/hyperplanner/i)
  expect(linkElement).toBeInTheDocument()
})
