import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api",
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
  withCredentials: true,
});

export default axiosInstance;
