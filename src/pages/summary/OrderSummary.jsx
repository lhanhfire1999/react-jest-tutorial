import React from 'react'

import ProductsOfOption from './ProductsOfOption'
import SummaryForm from './SummaryForm'

const OrderSummary = () => {
  return (
    <>
      <h1>Order Summary</h1>
      <ProductsOfOption optionType="scoops" />
      <ProductsOfOption optionType="toppings" />
      <SummaryForm />
    </>
  )
}

export default OrderSummary
