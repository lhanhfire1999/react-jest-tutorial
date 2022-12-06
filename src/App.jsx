import { Container } from 'react-bootstrap'
import './App.css'

import { OrderDetailProvider } from './contexts/OrderDetailContext'
import OrderEntry from './pages/entry/OrderEntry'

function App() {
  return (
    <Container>
      <OrderDetailProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  )
}

export default App
