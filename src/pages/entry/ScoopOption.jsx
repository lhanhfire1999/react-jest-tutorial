import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useOrderDetail } from '../../contexts/orderDetailContext'

export default function ScoopOptions({ name, imagePath }) {
  const { handleUpdateOrder } = useOrderDetail()
  const [isValid, setIsValid] = useState(true)
  const handleChange = (e) => {
    const currentValue = parseFloat(e.target.value)

    const isValidValue =
      0 <= currentValue &&
      currentValue <= 10 &&
      Math.floor(currentValue) === currentValue

    setIsValid(() => {
      if (isValidValue) return true
      return false
    })

    if (isValidValue) {
      handleUpdateOrder({
        prodName: name,
        prodQuantity: currentValue,
        prodType: 'scoops',
      })
    }
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}
