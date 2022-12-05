import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import OrderEntry from '../OrderEntry'

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

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert')
    expect(alerts).toHaveLength(2)
  })
})
