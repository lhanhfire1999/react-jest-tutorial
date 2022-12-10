import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import OrderConfirmation from '../OrderConfirmation'

test('Error response from server', async () => {
  server.use(
    rest.post('http://localhost:3030/order', (req, res, ctx) =>
      res.once(ctx.status(500))
    )
  )
  render(<OrderConfirmation />)
  const alert = await screen.findByRole('alert')
  expect(alert).toHaveTextContent(
    /An unexpected error occurred. Please try again later./i
  )
})
