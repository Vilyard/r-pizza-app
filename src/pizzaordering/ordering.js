export default {
  addPizzaToCart(id, quantity, selectedPizzaSize, cartItems, pizzaProducts) {
    const pizzaToAdd = pizzaProducts.find((pizza) => pizza.id === id);

    const addedPizza = cartItems.find((pizza) => pizza.id === id && pizza.selectedPizzaSize === selectedPizzaSize);
    let pizzaCartItems;
    if(addedPizza){
        addedPizza.quantity=addedPizza.quantity+quantity;
        pizzaCartItems = [
          ...cartItems,
        ];
    }else{
      pizzaCartItems = [
        ...cartItems,
        {
          ...pizzaToAdd,
          quantity:quantity,
          selectedPizzaSize:selectedPizzaSize,
        }
      ];
    }

    return pizzaCartItems;
  },
  removePizzaFromCart(id, selectedPizzaSize, cartItems){
    const leftOverItems = cartItems.filter((pizza) => !(pizza.id === id && pizza.selectedPizzaSize === selectedPizzaSize));
    return leftOverItems;
  },
};