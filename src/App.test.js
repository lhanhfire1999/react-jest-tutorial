import { render, screen, fireEvent } from '@testing-library/react'
import App, { handleReplaceCamelCaseWithSpace } from './App'

test('button has correct initial color', () => {
  render(<App />)
  // find an element with role is button and text is "Change to blue"
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })

  // expect the background color is red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' })

  // Click button
  fireEvent.click(colorButton)

  // expect the background color is blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' })

  // expect button's text is "Change to red"
  expect(colorButton).toHaveTextContent('Change to red')
})

test('condition initial', () => {
  render(<App />)

  // Check that the checkbox starts "enabled"
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
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
  const elementBtn = screen.getByRole('button', { name: 'Change to blue' })

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
  const elementBtn = screen.getByRole('button', { name: 'Change to blue' })

  // Disabled button
  fireEvent.click(elementCheckbox)
  expect(elementBtn).toHaveStyle({ backgroundColor: 'gray' })

  // Re-enabled button
  fireEvent.click(elementCheckbox)
  expect(elementBtn).toHaveStyle({ backgroundColor: 'red' })
})

test('Disabled button has gray background and reverts is blue', () => {
  render(<App />)

  const elementCheckbox = screen.getByRole('checkbox', {
    name: 'Disabled button',
  })
  const elementBtn = screen.getByRole('button', { name: 'Change to blue' })

  fireEvent.click(elementBtn)

  fireEvent.click(elementCheckbox)
  expect(elementBtn).toHaveStyle({ backgroundColor: 'gray' })

  fireEvent.click(elementCheckbox)
  expect(elementBtn).toHaveStyle({ backgroundColor: 'blue' })
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
