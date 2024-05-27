import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store/auth";

const API_URL = `${
  process.env.REACT_APP_BACKEND_API_URL || "http://localhost:5000/api"
}/posts`;

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token !== null) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const getAllPosts = () => {
  return axiosClient
    .get("/")
    .then((res) => {
      console.log("res: ", res);
      return res;
    })
    .catch((err) => {
      console.log("error: ", err);
      toast.error(err.message);
    });
};

const createNewPost = ({ title, content }) => {
  return axiosClient
    .post("/", {
      title,
      content,
    })
    .then((res) => {
      console.log("res: ", res);
      toast.success(res.data.message);
      return res;
    })
    .catch((err) => {
      console.log("error: ", err);
      toast.error(err.message);
    });
};

const PostService = {
  getAllPosts,
  createNewPost,
};

export default PostService;
