import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import { CartContext } from '../../context/cartContext'

const HomePage = () => {
  const { pizzaProducts, addToCart, cartItems } = useContext(CartContext)
  console.log(cartItems);
  return (
    <div id="pizzaMenu">
      {pizzaProducts.map(pizza => (
        <div key={pizza.id} className="product">
          <div className='priceTag'>
            {pizza.priceSmall} ден - {pizza.priceBig} ден
          </div>
          <Link to={pizza.name}>
          <img src={pizza.image} alt={pizza.name} />
          </Link>
          <h2>{pizza.name}</h2>
          <p>{pizza.ingredients}</p>
          <Link to={pizza.name}>
          <button>Buy Pizza</button>
          </Link>
        </div>
      ))}


    </div>
  )
}

export default HomePage