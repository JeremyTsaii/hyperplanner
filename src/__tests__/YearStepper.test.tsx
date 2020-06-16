import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import YearStepper from '../components/stepper'

describe('YearStepper', () => {
  test('Renders YearStepper Without Crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<YearStepper />, div)
  })
  test('Renders Years Texts in YearStepper', () => {
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
})
