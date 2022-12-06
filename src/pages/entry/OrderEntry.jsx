import React from 'react'
import { useOrderDetail } from '../../contexts/OrderDetailContext'
import { formatCurrency } from '../../utilities'
import Options from './Options'

const OrderEntry = () => {
  const { totalPrice } = useOrderDetail()

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {formatCurrency(totalPrice.grandTotal)}</h2>
    </div>
  )
}

export default OrderEntry
