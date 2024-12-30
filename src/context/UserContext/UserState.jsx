import { createContext, useReducer } from "react";
import axios from "axios";
import UserReducer from "./UserReducer.js";

const token = localStorage.getItem("token") || "";
const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  token: token,
  user: user,
};

const API_URL = "http://localhost:3000/users";

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const login = async (user) => {
    try {
      const res = await axios.post(API_URL + "/login", user);
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/getInfo", {
      headers: {
        Authorization: token,
      },
    });
    
    dispatch({
      type: "GET_USER_INFO",
      payload: res.data,
    });
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(API_URL + "/logout", {
      headers: {
        Authorization: token,
      },
    });
  
    dispatch({
      type: "LOGOUT",
    });
    if (res.data) {
      localStorage.clear();
    }
  };

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        login,
        getUserInfo,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
