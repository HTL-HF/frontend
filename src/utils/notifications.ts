import { StatusCodes } from "http-status-codes";
import { AxiosError } from "axios";
import { AlertColor } from "@mui/material";

const showErrorCustomMessage = (
  error: AxiosError,
  statusMap: Partial<Record<StatusCodes, string>>,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  const statusCode = error.response?.status as StatusCodes;

  if (statusCode && statusMap[statusCode]) {
    showNotification(statusMap[statusCode] as string, "error");
  } else {
    showNotification(
      "Something wrong with the server, try again later",
      "error"
    );
    console.log(error);
  }
};

const showErrorDefaultMessage = (
  error: AxiosError,
  possibleStatusCodes: StatusCodes[],
  showNotification: (message: string, severity: AlertColor) => void
) => {
  const statusMap = possibleStatusCodes.reduce((map, code) => {
    map[code] = error.response?.data as string;
    return map;
  }, {} as Partial<Record<StatusCodes, string>>);

  showErrorCustomMessage(error, statusMap, showNotification);
};

export const showError = (
  error: AxiosError,
  statusMap: Partial<Record<StatusCodes, string>> | StatusCodes[],
  showNotification: (message: string, severity: AlertColor) => void
) => {
  if (Array.isArray(statusMap)) {
    showErrorDefaultMessage(error, statusMap, showNotification);
  } else {
    showErrorCustomMessage(error, statusMap, showNotification);
  }
};
