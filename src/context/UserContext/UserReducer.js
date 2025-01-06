const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token, 
        user: action.payload.user,  
      };
    case "GET_USER_INFO":
      return {
        ...state,
      };
    case "LOGOUT":
      return {
        ...state,
        token: "",                   
        user: null,                  
      };
    default:
      return state;                   
  }
};

export default UserReducer;
/*default: const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token, // Guarda el token de autenticación
        user: action.payload.user,  // Guarda los datos del usuario
        isAuthenticated: true,      // Marca al usuario como autenticado
      };

    // Caso para registrar usuarios
    case "REGISTER":
      return {
        ...state,
        token: action.payload.token, // Guarda el token tras el registro
        user: action.payload.user,  // Guarda los datos del usuario registrado
        isAuthenticated: true,      // Marca al usuario como autenticado
      };

    // Caso para obtener información del usuario
    case "GET_USER_INFO":
      return {
        ...state,
        user: action.payload.user, // Actualiza los datos del usuario
      };

    // Caso para manejar el logout de usuarios
    case "LOGOUT":
      return {
        ...state,
        token: "",                   // Borra el token de autenticación
        user: null,                  // Borra los datos del usuario
        isAuthenticated: false,      // Marca al usuario como no autenticado
      };

    // Caso para manejar errores (opcional)
    case "AUTH_ERROR":
      return {
        ...state,
        token: "",                   // Borra el token
        user: null,                  // Borra los datos del usuario
        isAuthenticated: false,      // Marca al usuario como no autenticado
      };

    default:
      return state;                  // Devuelve el estado actual si no se reconoce la acción
  }
};

  export default UserReducer;*/