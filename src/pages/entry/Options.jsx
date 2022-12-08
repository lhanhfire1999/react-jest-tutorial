import axios from 'axios'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import { useOrderDetail } from '../../contexts/orderDetailContext'
import AlertBanner from '../../src/AlertBanner'
import { formatCurrency } from '../../utilities'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'

export default function Options({ optionType }) {
  const { totalPrice } = useOrderDetail()
  const [items, setItems] = useState([])
  const [isError, setIsError] = useState(false)

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setIsError(true)
      })
  }, [optionType])

  if (isError) return <AlertBanner />

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
  const title = `${
    optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()
  }`

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(totalPrice[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totalPrice[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}
