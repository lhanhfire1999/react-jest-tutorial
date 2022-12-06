import Options from '../Options'
import userEvent from '@testing-library/user-event'

import { render, screen } from '../../../test-utils/test-library-utils'

test('Update subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />)

  const scoopTotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopTotal).toHaveTextContent('0.00')

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  await userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '1')
  expect(scoopTotal).toHaveTextContent('2.00')

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  await userEvent.clear(chocolateInput)
  await userEvent.type(chocolateInput, '2')
  expect(scoopTotal).toHaveTextContent('6.00')
})
