export const CartReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return {
        ...state,
        cart: state.cart.some((item) => item.id === action.product.id)
          ? state.cart.map((item) =>
              item.id === action.product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...action.product, quantity: 1 }],
      };
    case "Add_Hart":
      return {
        ...state,
        hart: state.hart.some((item) => item.id === action.product.id)
          ? state.hart.map((item) =>
              item.id === action.product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.hart, { ...action.product, quantity: 1 }],
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
            : item
        ),
      };
    case "UPDATE_CART":
      return {
        ...state,
        cart: state.cart.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        })),
      };
    default:
      return state;
  }
};
