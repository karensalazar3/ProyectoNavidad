const ProductReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: action.payload,
      };
      case "CLEAR_CART":
        return { ...state, cart: [] }; 
    default:
      return state;
  }
};

export default ProductReducer;