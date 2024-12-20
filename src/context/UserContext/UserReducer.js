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
