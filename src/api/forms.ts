import { AxiosError } from "axios";
import { server } from "../configs/axiosConfig";
import { StatusCodes } from "http-status-codes";
import { showError } from "../utils/notifications";
import { AlertColor } from "@mui/material";
import { FormModel } from "../types/form";

export const sendDeleteForm = async (
  id: string,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    return (await server.delete(`/forms/${id}`, { withCredentials: true }))
      .data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const statusMap = {
        [StatusCodes.UNAUTHORIZED]: "You need to login",
      };
      showError(err, statusMap, showNotification);
    }
  }
};

export const sendCreateForm = async (
  form: FormModel,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  try {
    await server.post("/forms", form, { withCredentials: true });
  } catch (err) {
    if (err instanceof AxiosError) {
      const statusMap = { [StatusCodes.UNAUTHORIZED]: "You need to login" };
      showError(err, statusMap, showNotification);
    }
  }
};
