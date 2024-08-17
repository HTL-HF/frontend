import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import User from "../types/user";
import { server } from "../configs/axiosConfig";

const users = {
  async register(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) {
    try {
      const response = await server.post(
        "/register",
        {
          firstName,
          lastName,
          username,
          email,
          password,
        },
        { withCredentials: true }
      );

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
  async login(username: string, password: string) {
    try {
      const response = await server.post(
        "/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      if (response && response.data.token) {
        const token = response.data.token;
        const user = jwtDecode<User>(token);
        return { token, user };
      }
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast(err.message, { type: "error" });
      }
    }
    return false;
  },
};

export default users;
