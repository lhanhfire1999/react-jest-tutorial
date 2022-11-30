import './App.css'
import { useState } from 'react'

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
        style={{ backgroundColor: `${colorToggle}` }}
        disabled={isCheckbox}
      >
        Change to {newButtonColor}
      </button>
      <input
        type="checkbox"
        value={isCheckbox}
        onChange={handleChangeCheckbox}
      />
    </div>
  )
}

export default App
