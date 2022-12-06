import React, { useContext, useState } from 'react'
import { pricePerOption } from '../constants'

const OrderDetailContext = React.createContext({
  totalPrice: { scoop: 0, topping: 0, grandTotal: 0 },
  handleResetOrder: () => {},
  handleUpdateOrder: () => {},
})

export const OrderDetailProvider = ({ children }) => {
  const [order, setOrder] = useState({ scoops: {}, toppings: {} })

  const handleUpdateOrder = ({ prodName, prodQuantity, prodType }) => {
    const newOrder = { ...order }
    order[prodType][prodName] = prodQuantity
    setOrder(newOrder)
  }

  const handleResetOrder = () => {
    setOrder({ scoops: {}, toppings: {} })
  }

  const handleCalculateTotalPrice = ({ prodType }) => {
    const amountOfProdType = Object.values(order[prodType])
    const totalCount = amountOfProdType.reduce((prev, curr) => prev + curr, 0)

    return totalCount * pricePerOption[prodType]
  }

  const totalPrice = {
    scoops: handleCalculateTotalPrice({ prodType: 'scoops' }),
    toppings: handleCalculateTotalPrice({ prodType: 'toppings' }),
    get grandTotal() {
      return this.scoops + this.toppings
    },
  }

  return (
    <OrderDetailContext.Provider
      value={{ totalPrice, handleUpdateOrder, handleResetOrder }}
    >
      {children}
    </OrderDetailContext.Provider>
  )
}

export const useOrderDetail = () => {
  return useContext(OrderDetailContext)
}
