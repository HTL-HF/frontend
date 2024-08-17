import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { server } from "../configs/axiosConfig";
import { StatusCodes } from "http-status-codes";
const users = {
  async register(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) {
    try {
      await server.post<{ id: string; token: string }>(
        "/users/register",
        {
          firstName,
          lastName,
          username,
          email,
          password,
        },
        { withCredentials: true }
      );

      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === String(StatusCodes.CONFLICT))
          toast(err.message, { type: "error" });
        else {
          toast("Something wrong with the server, try again later", {
            type: "error",
          });
          console.log(err);
        }
      }
    }

    return false;
  },
  async login(username: string, password: string) {
    try {
      await server.post<{ id: string; token: string }>(
        "/users/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === String(StatusCodes.NOT_FOUND)) {
          toast(err.message, { type: "error" });
        } else {
          toast("Something wrong with the server, try again later", {
            type: "error",
          });
          console.log(err);
        }
      }
    }

    return false;
  },
  async forms() {
    try {
      await server.get("/users/forms", { withCredentials: true });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === String(StatusCodes.UNAUTHORIZED)) {
          toast(err.message, { type: "error" });
        } else {
          toast("Something wrong with the server, try again later", {
            type: "error",
          });
          console.log(err);
        }
      }
    }
  },
};

export default users;
