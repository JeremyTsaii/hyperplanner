import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import GitButton from '../components/gitButton'

describe('GitHub Button', () => {
  test('Renders GitHub Button Without Crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GitButton />, div)
  })
  test('Renders Text in GitHub Button', () => {
    const { getByText } = render(<GitButton />)

    const text = getByText(/github/i)
    expect(text).toBeInTheDocument()
  })
})
