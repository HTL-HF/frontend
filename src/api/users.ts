// src/api/users.ts
import { AxiosError } from "axios";
import { server } from "../configs/axiosConfig";
import { StatusCodes } from "http-status-codes";
import { showError } from "../utils/notifications";
import { AlertColor } from "@mui/material";

const users = {
  async register(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    showNotification: (message: string, severity: AlertColor) => void
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
        const statusMap = {
          [StatusCodes.CONFLICT]: "This email or username is already taken.",
        };
        showError(err, statusMap, showNotification);
      }
    }

    return false;
  },

  async login(username: string, password: string, showNotification: (message: string, severity: AlertColor) => void) {
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
        const statusMap = {
          [StatusCodes.NOT_FOUND]: "Invalid username or password.",
        };
        showError(err, statusMap, showNotification);
      }
    }

    return false;
  },

  async forms(showNotification: (message: string, severity: AlertColor) => void) {
    try {
      return (await server.get("/users/forms", { withCredentials: true })).data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const statusMap = {
          [StatusCodes.UNAUTHORIZED]: "You need to log in to access this.",
        };
        showError(err, statusMap, showNotification);
      }
    }
  },
};

export default users;
