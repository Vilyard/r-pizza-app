import React, { useEffect, useState } from 'react'
import Api from '../../Api';
const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        Api().get('/orders')
        .then((response) => setOrders(response.data))
        .catch(console.error)
    }, []);

  return (
    <div id="order">{
            orders.map((order) => (
                <div>
                    <h1>{order._id} </h1>
                    <ol>
                        {
                            order.cartItems.map(item => (
                                <li>
                                    {item.name},
                                    {item.quantity},
                                    {item.selectedPizzaSize},
                                </li>
                            ))
                        }
                    </ol>
                </div>

            ))
        }</div>
  )
}

export default OrdersPage