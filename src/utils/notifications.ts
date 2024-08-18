import { StatusCodes } from "http-status-codes";
import { AxiosError } from "axios";
import { AlertColor } from "@mui/material";

const convertMapToArray = (
  statusMap: Partial<Record<StatusCodes, string>>
): StatusCodes[] => {
  return Object.keys(statusMap).map((key) => Number(key) as StatusCodes);
};

const showErrorDefaultMessage = (
  error: AxiosError,
  possibleStatusCodes: StatusCodes[],
  showNotification: (message: string, severity: AlertColor) => void
) => {
  if (error.response && possibleStatusCodes.includes(error.response.status)) {
    showNotification(error.response.data as string, "error");
  } else {
    showNotification(
      "Something wrong with the server, try again later",
      "error"
    );
    console.log(error);
  }
};

const showErrorCustomMessage = (
  error: AxiosError,
  statusMap: Partial<Record<StatusCodes, string>>,
  showNotification: (message: string, severity: AlertColor) => void
) => {
  const possibleStatusCodes = convertMapToArray(statusMap);
  showErrorDefaultMessage(error, possibleStatusCodes, showNotification);
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
