import axios from "axios";

const api = axios.create({
  baseURL: "https://taskflow-ai-wjlk.onrender.com/api",
});

export default api;