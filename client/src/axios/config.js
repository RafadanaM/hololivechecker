import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/v2",
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
  withCredentials: true,
});

export default instance;
