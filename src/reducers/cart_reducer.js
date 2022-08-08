import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  UPDATE_FREIGHT,
  
} from "../actions";

const cart_reducer = (state, action) => {

  if (action.type === ADD_TO_CART) {
    const { id, colors, amount, single } = action.payload;
    const tempItem = state.cart.find((itm) => itm.id === id + colors);
    if (tempItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + colors) {
          let newAmount = item.amount + amount;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + colors,
        name: single.name,
        colors,
        amount,
        image: single.images[0].url,
        price: single.price,
        max: single.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
     
    const tempCart = state.cart
      .map((item) => {
        if (item.id === id) {
          if (value === "inc") {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount,  };
          }
          if (value === "dec") {
            let newAmount = item.amount - 1;

            if (newAmount < 1) {
              return { ...item, amount: item.amount - 1 };
            }
            return { ...item, amount: newAmount };
          }
        } else {
          return item;
        }
      })
      .filter((item) => item.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { items, total } = state.cart.reduce(
      (total, curr) => {
        const { price, amount } = curr;
        total.items += amount;
        total.total += price * amount;
        return total;
      },
      {
        items: 0,
        total: 0,
      }
    );
    return { ...state, items, total };
  }
  if (action.type === UPDATE_FREIGHT) {
    const freight = 534;

    let newFreight = freight * state.items;
    return { ...state, freight: newFreight };
  }

  //return state
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
