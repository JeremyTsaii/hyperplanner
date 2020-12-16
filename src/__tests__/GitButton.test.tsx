import React from 'react'
import { render } from '@testing-library/react'
import GitButton from '../components/GitButton'

describe('GitHub Button', () => {
  test('Renders GitHub Button Without Crashing', () => {
    render(<GitButton />)
  })
  test('Renders Text in GitHub Button', () => {
    const { getByText } = render(<GitButton />)
    expect(getByText(/github/i)).toBeInTheDocument()
  })
})
