import React from 'react'
import { render } from '@testing-library/react'
import YearStepper from './components/stepper'

// Necessary to prevent unit testing ReactGA errors
jest.mock('react-ga')

test('Renders Years in YearStepper', () => {
  const { getByText } = render(<YearStepper />)

  const year1text = getByText(/freshman/i)
  expect(year1text).toBeInTheDocument()

  const year2text = getByText(/sophomore/i)
  expect(year2text).toBeInTheDocument()

  const year3text = getByText(/junior/i)
  expect(year3text).toBeInTheDocument()

  const year4text = getByText(/senior/i)
  expect(year4text).toBeInTheDocument()
})
