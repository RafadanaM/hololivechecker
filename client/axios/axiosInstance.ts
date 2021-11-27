import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/v2",
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
});

export default axiosInstance;
