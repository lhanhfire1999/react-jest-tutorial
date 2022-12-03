import { render, screen, fireEvent } from '@testing-library/react'
import App, { handleReplaceCamelCaseWithSpace } from './App'

test('Button has correct initial color', () => {
  render(<App />)
  // find an element with role is button and text is "Change to Midnight Blue"
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })

  // expect the background color is MidnightVioletRed
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

  // Click button
  fireEvent.click(colorButton)

  // expect the background color is Midnight Blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' })

  // expect button's text is "Change to Midnight Violet Red"
  expect(colorButton).toHaveTextContent('Change to Medium Violet Red')
})

test('Condition initial', () => {
  render(<App />)

  // Check that the checkbox starts "enabled"
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  expect(colorButton).toBeEnabled()

  // Check that the checkbox starts "unchecked"
  const checkboxEle = screen.getByRole('checkbox')
  expect(checkboxEle).not.toBeChecked()
})

test('Checkbox disables on first click and enables on second click', () => {
  render(<App />)

  const elementCheckbox = screen.getByRole('checkbox', {
    name: 'Disabled button',
  })
  const elementBtn = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })

  fireEvent.click(elementCheckbox)

  expect(elementCheckbox).toBeChecked()
  expect(elementBtn).toBeDisabled()

  fireEvent.click(elementCheckbox)
  expect(elementCheckbox).not.toBeChecked()
  expect(elementBtn).toBeEnabled()
})

test('Disabled button has gray background and reverts is red', () => {
  render(<App />)

  const elementCheckbox = screen.getByRole('checkbox', {
    name: 'Disabled button',
  })
  const elementBtn = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })

  // Disabled button
  fireEvent.click(elementCheckbox)
  expect(elementBtn).toHaveStyle({ backgroundColor: 'gray' })

  // Re-enabled button
  fireEvent.click(elementCheckbox)
  expect(elementBtn).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
})

test('Disabled button has gray background and reverts is blue', () => {
  render(<App />)

  const elementCheckbox = screen.getByRole('checkbox', {
    name: 'Disabled button',
  })
  const elementBtn = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })

  fireEvent.click(elementBtn)

  fireEvent.click(elementCheckbox)
  expect(elementBtn).toHaveStyle({ backgroundColor: 'gray' })

  fireEvent.click(elementCheckbox)
  expect(elementBtn).toHaveStyle({ backgroundColor: 'MidnightBlue' })
})

describe('Add spaces before camelCase capital letters', () => {
  test('Work for no inner capital letter', () => {
    expect(handleReplaceCamelCaseWithSpace('Red')).toBe('Red')
  })

  test('Work for one inner capital letter', () => {
    expect(handleReplaceCamelCaseWithSpace('blueRed')).toBe('blue Red')
  })
  test('Work for multiple inner capital letters', () => {
    expect(handleReplaceCamelCaseWithSpace('blueGreenWhite')).toBe(
      'blue Green White'
    )
  })
})
