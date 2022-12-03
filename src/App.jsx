import './App.css'
import { useState } from 'react'

export const handleReplaceCamelCaseWithSpace = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const [colorToggle, setColorToggle] = useState('MediumVioletRed')
  const [isCheckbox, setIsCheckbox] = useState(false)
  const newButtonColor =
    colorToggle === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'

  const handleChangeColor = () => {
    setColorToggle((prev) =>
      prev === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'
    )
  }

  const handleChangeCheckbox = () => {
    setIsCheckbox((prev) => !prev)
  }
  return (
    <div>
      <button
        onClick={handleChangeColor}
        style={{ backgroundColor: `${isCheckbox ? 'gray' : colorToggle}` }}
        disabled={isCheckbox}
      >
        Change to {handleReplaceCamelCaseWithSpace(newButtonColor)}
      </button>
      <input
        id="disabled-button-checkbox"
        type="checkbox"
        value={isCheckbox}
        onChange={handleChangeCheckbox}
      />

      <label htmlFor="disabled-button-checkbox">Disabled button</label>
    </div>
  )
}

export default App
