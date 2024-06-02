import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store/auth";
import { setToken, clearToken } from "../features/auth/authSlice";

const API_URL = `${
  process.env.REACT_APP_BACKEND_API_URL || "http://localhost:5000/api"
}/auth`;

const register = ({ email, password, firstName, lastName }) => {
  return axios
    .post(`${API_URL}/register`, {
      email,
      password,
      firstName,
      lastName,
    })
    .then((res) => {
      console.log("res: ", res);
      toast.success(res.data.message);
      return res;
    })
    .catch((err) => {
      console.log("error: ", err);
      if (err?.response?.status === 409) {
        toast.warn(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    });
};

const login = ({ email, password }) => {
  return axios
    .post(`${API_URL}/login`, {
      email,
      password,
    })
    .then((res) => {
      console.log("res: ", res);
      toast.success(res.data.message);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        store.dispatch(setToken(res.data.token));
      }
      return res;
    })
    .catch((err) => {
      console.log("error: ", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        toast.warn(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    });
};

const logout = () => {
  localStorage.removeItem("token");
  store.dispatch(clearToken());
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
