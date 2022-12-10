import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../test-utils/test-library-utils'
import ScoopOption from '../ScoopOption'

test('Validate the value scoops orders', async () => {
  const user = userEvent.setup()
  render(<ScoopOption />)

  const vanillaInput = screen.getByRole('spinbutton')

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '-1')
  expect(vanillaInput).toHaveClass('is-invalid')

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '1.5')
  expect(vanillaInput).toHaveClass('is-invalid')

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '11')
  expect(vanillaInput).toHaveClass('is-invalid')

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '3')
  expect(vanillaInput).not.toHaveClass('is-invalid')
})
