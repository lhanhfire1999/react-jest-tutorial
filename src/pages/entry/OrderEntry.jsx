import React from 'react'
import Button from 'react-bootstrap/Button'

import { useCurrentPhase } from '../../contexts/currentPhaseContext'
import { useOrderDetail } from '../../contexts/orderDetailContext'
import { formatCurrency } from '../../utilities'

import Options from './Options'

const OrderEntry = () => {
  const { totalPrice } = useOrderDetail()
  const { onSetCurrentPhase } = useCurrentPhase()

  const isOrderDisabled = totalPrice.scoops <= 0

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {formatCurrency(totalPrice.grandTotal)}</h2>
      <Button
        disabled={isOrderDisabled}
        onClick={() => onSetCurrentPhase('REVIEW')}
      >
        Order Ice cream
      </Button>
    </div>
  )
}

export default OrderEntry
