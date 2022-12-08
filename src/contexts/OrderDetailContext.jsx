import React, { useContext, useState } from 'react'
import { pricePerOption } from '../constants'

const OrderDetailContext = React.createContext({
  totalPrice: { scoops: 0, toppings: 0, grandTotal: 0 },
  handleResetOrder: () => {},
  handleUpdateOrder: ({ prodType }) => {},
  handleObjEntriesWithType: ({ prodType }) => {},
})

export const OrderDetailProvider = ({ children }) => {
  const [orderOption, setOrderOption] = useState({ scoops: {}, toppings: {} })

  const handleUpdateOrder = ({ prodName, prodQuantity, prodType }) => {
    const newOrder = { ...orderOption }
    orderOption[prodType][prodName] = prodQuantity
    setOrderOption(newOrder)
  }

  const handleResetOrder = () => {
    setOrderOption({ scoops: {}, toppings: {} })
  }

  const handleCalculateTotalPrice = ({ prodType }) => {
    const amountOfProdType = Object.values(orderOption[prodType])
    const totalCount = amountOfProdType.reduce((prev, curr) => prev + curr, 0)

    return totalCount * pricePerOption[prodType]
  }

  const handleObjEntriesWithType = ({ prodType }) => {
    return Object.entries(orderOption[prodType])
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
      value={{
        totalPrice,
        handleUpdateOrder,
        handleResetOrder,
        handleObjEntriesWithType,
      }}
    >
      {children}
    </OrderDetailContext.Provider>
  )
}

export const useOrderDetail = () => {
  return useContext(OrderDetailContext)
}
