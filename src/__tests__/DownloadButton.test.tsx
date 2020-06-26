import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import DownloadButton from '../components/DownloadButton'

describe('Download Button', () => {
  test('Renders Download Button Without Crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DownloadButton />, div)
  })
  test('Renders Text in Download Button', () => {
    const { getByText } = render(<DownloadButton />)

    const text = getByText(/download/i)
    expect(text).toBeInTheDocument()
  })
})
