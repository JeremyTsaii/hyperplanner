import React from 'react'
import { render } from '@testing-library/react'
import HelpModal from '../../components/Top/HelpModal'

describe('Help Button With Modal', () => {
  test('Renders Text in Help Button Without Crashing', () => {
    const { getByText } = render(<HelpModal />)
    expect(getByText(/help/i)).toBeInTheDocument()
  })
})
