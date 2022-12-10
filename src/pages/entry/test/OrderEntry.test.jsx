import { render, screen, waitFor } from '../../../test-utils/test-library-utils'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import OrderEntry from '../OrderEntry'
import useEvent from '@testing-library/user-event'

test('handles error for scoop and topping routes', async () => {
  server.use(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res.once(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res.once(ctx.status(500))
    )
  )

  render(<OrderEntry />)

  // await waitFor(async () => {
  const alerts = await screen.findAllByRole('alert')
  expect(alerts).toHaveLength(2)
  // })
})

test('Enabled button when increase quantity the particular scoop to 1, and disabled button when decrease it to 0', async () => {
  const user = useEvent.setup()
  render(<OrderEntry />)

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, '1')

  const orderButton = screen.getByRole('button', { name: /order ice cream/i })
  expect(orderButton).toBeEnabled()

  await user.clear(chocolateInput)
  await user.type(chocolateInput, '0')

  expect(orderButton).toBeDisabled()
})
