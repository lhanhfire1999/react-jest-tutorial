import { useState } from 'react'
import { Container } from 'react-bootstrap'
import './App.css'
import { CurrentPhaseProvider } from './contexts/currentPhaseContext'

import { OrderDetailProvider } from './contexts/orderDetailContext'
import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'

function App() {
  const [currentPhase, setCurrentPhase] = useState('INPROGRESS')

  let CurrentPhaseComponent = OrderEntry

  switch (currentPhase) {
    case 'REVIEW':
      CurrentPhaseComponent = OrderSummary
      break
    case 'COMPLETED':
      CurrentPhaseComponent = OrderConfirmation
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
