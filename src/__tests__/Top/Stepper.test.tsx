import React from 'react'
import { render } from '@testing-library/react'
import YearStepper from '../../components/Top/Stepper'
import { mockUserContext } from '../../static/mocks'
import { UserContext } from '../../context/UserContext'

describe('Year Stepper', () => {
  test('Renders Text in Year Stepper Without Crashing', () => {
    const { getByText } = render(
      <UserContext.Provider value={mockUserContext}>
        <YearStepper />
      </UserContext.Provider>,
    )

    expect(getByText(/freshman/i)).toBeInTheDocument()
    expect(getByText(/sophomore/i)).toBeInTheDocument()
    expect(getByText(/junior/i)).toBeInTheDocument()
    expect(getByText(/senior/i)).toBeInTheDocument()
  })
})
