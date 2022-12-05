import { render, screen } from '@testing-library/react'
import Options from '../Options'

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
