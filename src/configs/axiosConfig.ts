import axios from "axios";

const IP = import.meta.env.VITE_BACKEND_IP || "localhost";
const PORT = import.meta.env.VITE_BACKEND_PORT || 3000;
console.log(import.meta.env);
export const server = axios.create({
  baseURL: `http://${IP}:${PORT}/api`,
});