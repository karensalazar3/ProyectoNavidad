import { createContext, useReducer } from "react";
import axios from "axios";
import ProductReducer from "./ProductReducer.js";

const cart = JSON.parse(localStorage.getItem("cart")) || []

const initialState = {
  products: [],
  cart: cart
};

const API_URL = "http://localhost:3000/products";


export const ProductContext = createContext(initialState);


export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL + "/getAll");
    dispatch({
      type: "GET_PRODUCTS",
      payload: res.data.products,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
