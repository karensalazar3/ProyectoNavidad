import { createContext, useReducer } from "react";
import axios from "axios";
import UserReducer from "./UserReducer.js";

const token = localStorage.getItem("token") || "";
const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  token: token,
  user: user,
  isAuthenticated: !!token, 
};

const API_URL = "http://localhost:3000/users";

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Función para registrar usuarios
  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/register`, userData);
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch({
          type: "REGISTER",
          payload: res.data,
        });
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error.response?.data?.message);
      throw new Error(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  // Función para iniciar sesión
  const login = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/login`, userData);
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data?.message);
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  // Función para obtener la información del usuario
  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/getInfo`, {
        headers: {
          Authorization: `Bearer ${token}`, // Asegura que el token esté en formato correcto
        },
      });
      dispatch({
        type: "GET_USER_INFO",
        payload: { user: res.data },
      });
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error.response?.data?.message);
      throw new Error(error.response?.data?.message || "Error al obtener la información del usuario");
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    try {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        register,
        login,
        getUserInfo,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
