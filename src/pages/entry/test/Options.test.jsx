import { render, screen } from '../../../test-utils/test-library-utils'
import Options from '../Options'
import userEvent from '@testing-library/user-event'

test('Display image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />)

  // When waiting for somethings to appear async, use 'await'  and 'findBy'

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })

  expect(scoopImages).toHaveLength(2)

  // String and numbers use except(element).toBe()
  // Array and object use except(element).toEqual()
  // Confirm alt text of images
  const altTexts = scoopImages.map((element) => element.alt)
  expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('Display image for each topping option from server', async () => {
  render(<Options optionType="toppings" />)

  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })

  expect(toppingImages).toHaveLength(3)

  const altTexts = toppingImages.map((item) => item.alt)

  expect(altTexts).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ])
})

test.only('Do not update subtotal when the quantity scoop is in-valid', async () => {
  const user = userEvent.setup()
  render(<Options optionType="scoops" />)

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, '-1')

  await userEvent.clear(chocolateInput)
  await userEvent.type(chocolateInput, '-1')

  const scoopTotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopTotal).toHaveTextContent('0.00')

  await user.clear(chocolateInput)
  await user.type(chocolateInput, '1.5')
  expect(scoopTotal).toHaveTextContent('0.00')

  await user.clear(chocolateInput)
  await user.type(chocolateInput, '11')
  expect(scoopTotal).toHaveTextContent('0.00')
})
