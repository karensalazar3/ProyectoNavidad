const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case "GET_USER_INFO":
      return {
        ...state,
        user: action.payload?.user || state.user,
      };

    case "LOGOUT":
      return {
        ...state,
        token: "",
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default UserReducer;
