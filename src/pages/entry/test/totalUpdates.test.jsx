import Options from '../Options'
import userEvent from '@testing-library/user-event'

import { render, screen } from '../../../test-utils/test-library-utils'
import OrderEntry from '../OrderEntry'

test('Update scoop subtotal when scoops change', async () => {
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

test('Update topping subtotal when topping change', async () => {
  render(<Options optionType="toppings" />)
  const toppingTotal = screen.getByText(`Toppings total: $`, { exact: false })
  expect(toppingTotal).toHaveTextContent('0.00')

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })

  await userEvent.click(cherriesCheckbox)
  expect(toppingTotal).toHaveTextContent('1.50')

  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  })
  await userEvent.click(hotFudgeCheckbox)
  expect(toppingTotal).toHaveTextContent('3.00')

  await userEvent.click(hotFudgeCheckbox)
  expect(toppingTotal).toHaveTextContent('1.50')
})

describe('Calculate the grand total', () => {
  test('Update grand total when scoop is added first', async () => {
    render(<OrderEntry />)

    // Test initial of the grand total is 0.00
    const grandTotal = screen.getByText('Grand total: $', { exact: false })
    expect(grandTotal).toHaveTextContent('0.00')

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    await userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('4.00')

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    await userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('Update grand total when topping is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByText('Grand total: $', { exact: false })

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    await userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    })
    await userEvent.click(hotFudgeCheckbox)
    expect(grandTotal).toHaveTextContent('3.00')

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })

    await userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('7.00')
  })

  test('Update grand total when removed item', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByText('Grand total: $', { exact: false })

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    await userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    })
    await userEvent.click(hotFudgeCheckbox)
    expect(grandTotal).toHaveTextContent('3.00')

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    await userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('7.00')

    await userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('5.50')
  })
})
