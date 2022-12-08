import { useState } from 'react'
import { Container } from 'react-bootstrap'
import './App.css'
import { CurrentPhaseProvider } from './contexts/currentPhaseContext'

import { OrderDetailProvider } from './contexts/orderDetailContext'
import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'

const Confirm = () => {
  return <h2>Your order created success</h2>
}

function App() {
  const [currentPhase, setCurrentPhase] = useState('INPROGRESS')

  let CurrentPhaseComponent = OrderEntry

  switch (currentPhase) {
    case 'REVIEW':
      CurrentPhaseComponent = OrderSummary
      break
    case 'COMPLETED':
      CurrentPhaseComponent = Confirm
      break
    case 'INPROGRESS':
      CurrentPhaseComponent = OrderEntry
      break
    default:
  }

  return (
    <CurrentPhaseProvider onSetCurrentPhase={setCurrentPhase}>
      <OrderDetailProvider>
        <Container>
          {/* Summary page and entry page need provider */}
          <CurrentPhaseComponent />
          {/* Confirmation page does not need provider */}
        </Container>
      </OrderDetailProvider>
    </CurrentPhaseProvider>
  )
}

export default App
