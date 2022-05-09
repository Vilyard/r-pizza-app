import React, { useContext, useState, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { CartContext } from "../../context/cartContext";

const Cart = () => {
  const { cartItems, removeFromCart, emptyCart } = useContext(CartContext);
  console.log(cartItems);
  const [isOpen, setIsOpen] = useState(false);

  const cartRef = useRef();
  useClickOutside(cartRef, () => setIsOpen(false));

  function handleOrder() {
    // axios
    //   .post("backendURL", {
    //     cartItems: cartItems,
    //   })
    //   .then(function () {
    //     emptyCart();
    //    setIsOpen(false);
    //    alert('Fala sto kupuvate kaj nas')
    //   })
    //   .catch((error) => console.log(error));

    setTimeout(() => {
      emptyCart();
      setIsOpen(false);
      alert("Fala sto kupuvate kaj nas");
    }, 1000);
  }

  return (
    <div>
      {isOpen && (
        <div
          className="test"
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            backgroundColor: `rgba(0,0,0,0.4)`,
            zIndex: 10,
          }}
        ></div>
      )}
      <div
        ref={cartRef}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: 20,
          zIndex: 20,
          backgroundColor: "white",
          border: "1px solid black",
        }}
      >
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {" "}
          Cart {cartItems.length && cartItems.length}
        </div>

        <div
          style={{
            display: !isOpen ? "none" : "block",
          }}
        >
          {cartItems.map((pizza) => (
            <div key={pizza.id + pizza.selectedPizzaSize}>
              <h2>
                {pizza.name}{" "}
                <button
                  onClick={() =>
                    removeFromCart(pizza.id, pizza.selectedPizzaSize)
                  }
                >
                  ❌
                </button>
              </h2>
              <h2>{pizza.selectedPizzaSize}</h2>
              <div>
                {pizza.selectedPizzaSize === "мала" &&
                  "Price:" +
                    pizza.priceSmall * pizza.quantity +
                    "den  -  " +
                    pizza.quantity}
              </div>
              <div>
                {pizza.selectedPizzaSize === "голема" &&
                  "Price" +
                    pizza.priceBig * pizza.quantity +
                    "den  -  " +
                    pizza.quantity}
              </div>
            </div>
          ))}

          <button onClick={handleOrder}>Order all</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
