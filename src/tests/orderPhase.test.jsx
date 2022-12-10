import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('overall for order phases with happy case', async () => {
  // render App
  const user = userEvent.setup()
  render(<App />)

  //Add ice-cream scoops and toppings (***INPROGRESS PHASE***)
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '1')

  const chocolateInput = screen.getByRole('spinbutton', {
    name: 'Chocolate',
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, '2')

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  await user.click(cherriesCheckbox)

  // Find and click order button
  const orderButton = screen.getByRole('button', {
    name: /order ice cream/i,
  })
  await user.click(orderButton)

  // Check summary subtotals
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' })
  expect(summaryHeading).toBeInTheDocument()

  const summaryScoop = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(summaryScoop).toBeInTheDocument()

  const summaryTopping = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  })
  expect(summaryTopping).toBeInTheDocument()

  expect(screen.getByText('Vanilla: 1')).toBeInTheDocument()
  expect(screen.getByText('Chocolate: 2')).toBeInTheDocument()
  expect(screen.getByText('Cherries: 1')).toBeInTheDocument()

  // Three above 'except' is alternative for:
  // const orderProducts = screen.getByAllRole('listitem')
  // const orderProductNames = orderProducts.map((element) => element.textContent)
  // expect(orderProductNames).toEqual([
  //   'Vanilla: 1',
  //   'Chocolate: 2',
  //   'Cherries: 1',
  // ])

  // accept terms and click button (***REVIEW PHASE***)
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  const confirmButton = screen.getByRole('button', { name: /confirm order/i })

  await user.click(checkbox)
  expect(confirmButton).toBeEnabled()

  // Change to phase 'COMPLETED'
  await user.click(confirmButton)

  // Expect appear 'loading' (***COMPLETED PHASE***)
  const loading = screen.getByText(/loading/i)
  expect(loading).toBeInTheDocument()

  // This is async because there is a POST request to sever
  const thanksHeading = await screen.findByRole('heading', {
    name: /thank you!/i,
  })
  expect(thanksHeading).toBeInTheDocument()

  // 'Loading' disappear more and use 'queryBy*' to test elements disappear
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()

  const newOrderButton = screen.getByRole('button', {
    name: /create new order/i,
  })
  await user.click(newOrderButton)

  // check the scoops and toppings have been reset (***INPROGRESS PHASE***)
  const grandTotal = screen.getByText('Grand total: $', { exact: false })
  expect(grandTotal).toHaveTextContent('0.00')
  const scoopTotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopTotal).toHaveTextContent('0.00')
  const toppingTotal = screen.getByText('Toppings total: $', { exact: false })
  expect(toppingTotal).toHaveTextContent('0.00')

  // check the produces appear to Testing Library doesn't get angry
  // about stuff happening after test is over
  await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await screen.findByRole('checkbox', { name: 'Cherries' })
})
