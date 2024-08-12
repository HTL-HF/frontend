import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import User from "../types/user";

const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_BASE_URL || "http://localhost:3000",
});

const users = {
  async register(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) {
    try {
      const response = await axiosInstance.post("/register", {
        firstName,
        lastName,
        username,
        email,
        password,
      });

      if (response && response.data.token) {
        const token = response.data.token;
        const user = jwtDecode<User>(token);
        return { token, user };
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.message, { type: "error" });
      }
    }
  },
};

export default users;
