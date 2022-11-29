import logo from './logo.svg'
import './App.css'
import { useState } from 'react'

function App() {
  const [colorToggle, setColorToggle] = useState(true)
  const handleChangeColor = () => {
    setColorToggle((prev) => !prev)
  }
  return (
    <button
      onClick={handleChangeColor}
      style={{ backgroundColor: `${colorToggle ? 'red' : 'blue'}` }}
    >
      {colorToggle ? 'Change to blue' : 'Change to red'}
    </button>
  )
}

export default App
