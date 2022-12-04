import { render, screen } from '@testing-library/react'
import SummaryForm from '../SummaryForm'
import userEvent from '@testing-library/user-event'

test(`Initial Checkbox's terms and conditions`, () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  const confirmButton = screen.getByRole('button', { name: /confirm order/i })

  expect(checkbox).not.toBeChecked()
  expect(confirmButton).toBeDisabled()
})

test(`Checkbox enables button on first click and disables on second click`, async () => {
  const user = userEvent.setup()
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  const confirmButton = screen.getByRole('button', { name: /confirm order/i })

  await user.click(checkbox)
  expect(confirmButton).toBeEnabled()

  await user.click(checkbox)
  expect(confirmButton).toBeDisabled()
})

test('Popover responds when hover', async () => {
  const user = userEvent.setup()
  render(<SummaryForm />)
  // Popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  )
  expect(nullPopover).not.toBeInTheDocument()

  // Popover show when mouse-over on checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  await user.hover(termsAndConditions)

  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()

  // Popover disappears when mouse out
  await user.unhover(termsAndConditions)
  expect(popover).not.toBeInTheDocument()
})
