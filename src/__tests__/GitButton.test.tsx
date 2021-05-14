import React from 'react'
import { render } from '@testing-library/react'
import GitButton from '../components/Top/GitButton'

describe('GitHub Button', () => {
  test('Renders Text in GitHub Button Without Crashing', () => {
    const { getByText } = render(<GitButton />)
    expect(getByText(/github/i)).toBeInTheDocument()
  })
})
