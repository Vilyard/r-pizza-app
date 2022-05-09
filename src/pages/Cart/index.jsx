import React, { useContext } from 'react'
import { CartContext } from '../../context/cartContext'

const CartPage = () => {
  const { cartItems } = useContext(CartContext)

  return (
    <div>
      {cartItems.map(pizza => (
        <div key={pizza.id}>
          <h2>{pizza.name} <button>❌</button></h2>
          <p>Price: {pizza.price}</p>
        </div>
      ))}
    </div>
  )
}

export default CartPage