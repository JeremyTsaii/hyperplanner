import React from 'react'
import { render } from '@testing-library/react'
import CircularProgress from '../../components/Middle/CircularProgress'

describe('Circular Progress', () => {
  test('Renders Text in Circular Progress Without Crashing', () => {
    const { getByText } = render(
      <CircularProgress title="test title" val={70} />,
    )
    expect(getByText(/test title/i)).toBeInTheDocument()
    expect(getByText(/70%/i)).toBeInTheDocument()
  })
})
