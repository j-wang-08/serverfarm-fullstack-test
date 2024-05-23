import axios from "axios";

const API_URL =
  process.env.REACT_APP_BACKEND_API_URL || "http://localhost:5000/api";

const register = (email, password, firstName, lastName) => {
  return axios.post(`${API_URL}/auth/register`, {
    email,
    password,
    firstName,
    lastName,
  });
};

const login = (email, password) => {
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
