import { AxiosError } from "axios";
import { server } from "../configs/axiosConfig";
import { StatusCodes } from "http-status-codes";
import { showErrorByStatusCode } from "../utils/notifications";
import { AlertColor } from "@mui/material";
import { FormModel } from "../types/form";

export const sendDeleteForm = async (
  id: string,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    const response = (
      await server.delete(`/forms/${id}`)
    ).data;

    showNotification("deleted form successfully", "success");

    return response;
  } catch (err) {
    if (err instanceof AxiosError) {
      const statusMap = {
        [StatusCodes.UNAUTHORIZED]: "You need to login",
      };
      showErrorByStatusCode(err, statusMap, showNotification);
    }
  }
};

export const sendCreateForm = async (
  form: FormModel,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    await server.post("/forms", form);
    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      const statusMap = {
        [StatusCodes.UNAUTHORIZED]: "You need to login",
        [StatusCodes.NOT_ACCEPTABLE]: err.response?.data,
      };
      showErrorByStatusCode(err, statusMap, showNotification);
    }
  }
  return false;
};
