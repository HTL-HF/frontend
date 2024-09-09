import { AxiosError } from "axios";
import { server } from "../configs/axiosConfig";
import { ResponseModal } from "../types/response";
import { AlertColor } from "@mui/material";
import { StatusCodes } from "http-status-codes";
import { showError } from "../utils/notifications";

export const sendResponse = async (
  formId: string,
  response: ResponseModal,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    await server.post(`/forms/${formId}/responses`, response);
    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      const statusMap = {
        [StatusCodes.UNAUTHORIZED]:
          "your Token is invalid try to logout and log back in",
        [StatusCodes.NOT_ACCEPTABLE]: err.response?.data,
      };

      showError(err, statusMap, showNotification);
    }
  }
};

export const sendGetResponses = async (
  formId: string,
  navigator: (path: string) => void,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    return (
      await server.get(`/forms/${formId}/responses`, { withCredentials: true })
    ).data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const statusMap = {
        [StatusCodes.UNAUTHORIZED]: "You need to login!",
        [StatusCodes.NOT_FOUND]: "No such form",
      };

      showError(err, statusMap, showNotification);

      if (err.response?.status === StatusCodes.NOT_FOUND) {
        navigator("/forms");
      }
    }
  }
};

export const sendDeleteResponse = async (
  formId: string,
  responseId:string,
  navigator: (path: string) => void,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    await server.delete(`/forms/${formId}/responses/${responseId}`, {
      withCredentials: true,
    });
    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      const statusMap = {
        [StatusCodes.UNAUTHORIZED]: "You need to login!",
        [StatusCodes.FORBIDDEN]: "You are not owner of this form",
        [StatusCodes.NOT_FOUND]: "No such form or response",
      };

      showError(err, statusMap, showNotification);

      if (err.response?.status === StatusCodes.NOT_FOUND) {
        navigator("/forms");
      }
    }
  }
  return false;
};
