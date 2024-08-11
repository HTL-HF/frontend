import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_BASE_URL || "http://localhost:3000",
});

export const users = {
  async login(username: string, password: string) {
    try {
      return await axiosInstance.post("/login", {
        username,
        password,
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.message, { type: "error" });
      }
    }
  },
};
