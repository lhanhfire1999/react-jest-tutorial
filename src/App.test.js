import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

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
