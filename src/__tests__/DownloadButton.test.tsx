import React from 'react'
import { render } from '@testing-library/react'
import DownloadButton from '../components/DownloadButton'

describe('Download Button', () => {
  test('Renders Download Button Without Crashing', () => {
    render(<DownloadButton />)
  })
  test('Renders Text in Download Button', () => {
    const { getByText } = render(<DownloadButton />)
    expect(getByText(/download/i)).toBeInTheDocument()
  })
})
