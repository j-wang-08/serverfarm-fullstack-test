import axios from "axios";
import { toast } from "react-toastify";

const API_URL =
  process.env.REACT_APP_BACKEND_API_URL || "http://localhost:5000/api";

const register = ({ email, password, firstName, lastName }) => {
  return axios
    .post(`${API_URL}/auth/register`, {
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
      if (err.response.status === 409) {
        toast.warn(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    });
};

const login = ({ email, password }) => {
  return axios
    .post(`${API_URL}/auth/login`, {
      email,
      password,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
