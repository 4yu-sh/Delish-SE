export const addDeicmals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //Calculate items price

  state.itemsPrice = addDeicmals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //Calculate shipping price

  state.shippingPrice = addDeicmals(state.itemsPrice > 1000 ? 0 : 150);

  //Calculate tax price

  state.taxPrice = addDeicmals(Number(0.15 * state.itemsPrice));
  //Calculate total price

  state.totalPrice = addDeicmals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
