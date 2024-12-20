import { createContext, useReducer } from "react";
import axios from "axios";
import ProductReducer from "./ProductReducer.js";

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  products: [],
  cart: cart,
};

const API_URL = "http://localhost:3000/products";

export const ProductContext = createContext(initialState);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);


  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL + "/getAll");
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data.products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const addCart = (product) => {
    const updatedCart = [...state.cart, product];
    dispatch({
      type: "ADD_TO_CART",
      payload: updatedCart,
    });
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  
  const removeCart = (productId) => {
    const updatedCart = state.cart.filter(item => item._id !== productId);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: updatedCart,
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        fetchProducts,
        addCart,
        removeCart, 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
