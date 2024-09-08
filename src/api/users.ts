import { AxiosError } from "axios";
import { server } from "../configs/axiosConfig";
import { StatusCodes } from "http-status-codes";
import { showErrorByStatusCode } from "../utils/notifications";
import { AlertColor } from "@mui/material";

export const sendRegister = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    await server.post<{ id: string; token: string }>(
      "/users/register",
      {
        firstName,
        lastName,
        username,
        email,
        password,
      }
    );

    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      const statusMap = {
        [StatusCodes.CONFLICT]: "This email or username is already taken.",
      };
      showErrorByStatusCode(err, statusMap, showNotification);
    }
  }

  return false;
};

export const sendLogin = async (
  username: string,
  password: string,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    await server.post<{ id: string; token: string }>(
      "/users/login",
      {
        username,
        password,
      }
    );

    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      const statusMap = {
        [StatusCodes.NOT_FOUND]: "Invalid username or password.",
      };
      showErrorByStatusCode(err, statusMap, showNotification);
    }
  }

  return false;
};

export const sendGetForms = async (
  showNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    return (await server.get("/users/forms")).data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const statusMap = {
        [StatusCodes.UNAUTHORIZED]: "You need to log in to access this.",
      };
      showErrorByStatusCode(err, statusMap, showNotification);
    }
  }
};
