import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useCurrentPhase } from '../../contexts/currentPhaseContext'
import { useOrderDetail } from '../../contexts/OrderDetailContext'
import AlertBanner from '../../src/AlertBanner'

const OrderConfirmation = () => {
  const { handleResetOrder } = useOrderDetail()
  const { onSetCurrentPhase } = useCurrentPhase()
  const [orderNumber, setOrderNumber] = useState()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    axios
      // in a real app we would get order details from context
      // and send with POST
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber)
      })
      .catch((error) => setHasError(true))
  }, [])

  function handleClick() {
    // clear the order details
    handleResetOrder()

    // send back to order page
    onSetCurrentPhase('INPROGRESS')
  }

  const newOrderButton = <Button onClick={handleClick}>Create new order</Button>

  if (hasError) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    )
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        {newOrderButton}
      </div>
    )
  } else {
    return <div>Loading</div>
  }
}

export default OrderConfirmation
