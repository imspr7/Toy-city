const initialState = {
  user: localStorage.getItem("ecom-user")
    ? JSON.parse(localStorage.getItem("ecom-user"))
    : null,
  loading: false,
  notifications: [],
};
// reducer for users

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST_INIT":
      return { ...state, loading: true };
    case "LOGIN_REQUEST_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "LOGIN_REQUEST_FAILED":
      return { ...state, loading: false, user: null, error: action.payload };
    case "SIGNUP_REQUEST_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "LOGOUT_REQUEST":
      return { ...state, loading: false, user: null };
    case "ADD_NOTIFICATION":
      state.user.notifications.unshift(action.payload);
      return state;
    case "RESET_NOTIFICATION":
      state.user.notifications.forEach((notification) => {
        notification.status = "read";
      });
      return state;
    default:
      return state;
  }
};
