import logo from './logo.svg'
import './App.css'
import { useState } from 'react'

function App() {
  const [colorToggle, setColorToggle] = useState('red')
  const [checkbox, setCheckbox] = useState(false)
  const newButtonColor = colorToggle === 'red' ? 'blue' : 'red'

  const handleChangeColor = () => {
    setColorToggle((prev) => (prev === 'red' ? 'blue' : 'red'))
  }

  const handleChangeCheckbox = () => {
    setCheckbox((prev) => !prev)
  }
  return (
    <div>
      <button
        onClick={handleChangeColor}
        style={{ backgroundColor: `${colorToggle}` }}
      >
        Change to {newButtonColor}
      </button>
      <input type="checkbox" value={checkbox} onChange={handleChangeCheckbox} />
    </div>
  )
}

export default App
