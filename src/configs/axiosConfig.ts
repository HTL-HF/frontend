import axios from "axios";

export const server = axios.create({
  baseURL: import.meta.env.BACKEND_BASE_URL || "http://localhost:3000",
});
