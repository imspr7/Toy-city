import axios from "../../api";

//Redux for users
export const LoginUser = (values) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST_INIT" });
    const { email, password } = values;
    const response = await axios.post("/users/login", { email, password });

    if (response.status === 200) {
      localStorage.setItem("ecom-user", JSON.stringify(response.data));

      dispatch({ type: "LOGIN_REQUEST_SUCCESS", payload: response.data });
    } else {
      dispatch({ type: "LOGIN_REQUEST_FAILED", payload: response.data });
    }
  } catch (error) {
    dispatch({ type: "LOGIN_REQUEST_FAILED", payload: error });
  }
};

export const SignUpUser = (values) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST_INIT" });
    const { email, password, name } = values;
    const { data } = await axios.post("/users/signup", {
      email,
      password,
      name,
    });

    // localStorage.setItem("blog-access-token", data.token);
    // localStorage.setItem("blog-user", JSON.stringify(data));

    dispatch({ type: "SIGNUP_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "LOGIN_REQUEST_FAILED", payload: error });
  }
};

export const LogOut = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT_REQUEST" });
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/users/update/${id}`);
    if (response.status === 200) {
      localStorage.setItem("ecom-user", JSON.stringify(response.data));

      dispatch({ type: "LOGIN_REQUEST_SUCCESS", payload: response.data });
    } else {
      dispatch({ type: "LOGIN_REQUEST_FAILED", payload: response.data });
    }
  } catch (error) {
    dispatch({ type: "LOGIN_REQUEST_FAILED", payload: error });
  }
};

export const addNotification = (msgObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ADD_NOTIFICATION", payload: msgObj });
  } catch (error) {
    console.log(error);
  }
};

export const resetNotification = () => async (dispatch, getState) => {
  try {
    const notifications = getState().user.notifications.forEach((obj) => {
      obj.status = "read";
    });
    dispatch({ type: "RESET_NOTIFICATION", payload: notifications });
  } catch (error) {
    console.log(error);
  }
};
