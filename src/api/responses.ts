import { AxiosError } from "axios";
import { server } from "../configs/axiosConfig";
import { ResponseModal } from "../types/response";
import { AlertColor } from "@mui/material";
import { StatusCodes } from "http-status-codes";
import { getErrorMessage } from "../utils/notifications";

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

      showNotification(getErrorMessage(err, statusMap), "error");
    }
  }
};
