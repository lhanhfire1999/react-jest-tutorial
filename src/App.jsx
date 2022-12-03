import './App.css'
import { useState } from 'react'

export const handleReplaceCamelCaseWithSpace = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const [colorToggle, setColorToggle] = useState('red')
  const [isCheckbox, setIsCheckbox] = useState(false)
  const newButtonColor = colorToggle === 'red' ? 'blue' : 'red'

  const handleChangeColor = () => {
    setColorToggle((prev) => (prev === 'red' ? 'blue' : 'red'))
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
        Change to {newButtonColor}
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
