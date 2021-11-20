import axios from "axios";

export const api = axios.create({
  baseURL: "https://youtube.com/channel/",
  headers: {
    "x-youtube-client-name": "1",
    "x-youtube-client-version": "2.20180222",
    "accept-language": "en-US,en;q=0.5",
  },
});
