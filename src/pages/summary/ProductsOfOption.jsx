import React from 'react'
import { useOrderDetail } from '../../contexts/orderDetailContext'
import { formatCurrency } from '../../utilities'

const ProductsOfOption = ({ optionType }) => {
  const { totalPrice, handleObjEntriesWithType } = useOrderDetail()

  const entriesList = handleObjEntriesWithType({ prodType: optionType })

  if (!entriesList.length) return null

  const sumOfPrice = formatCurrency(totalPrice[optionType])
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  return (
    <>
      <h2>{`${title}:  ${sumOfPrice}`}</h2>
      <ul>
        {entriesList.map(([prodName, prodQuantity]) => (
          <li key={prodName}>{`${prodName}: ${prodQuantity}`}</li>
        ))}
      </ul>
    </>
  )
}

export default ProductsOfOption
