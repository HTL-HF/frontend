import { StatusCodes } from "http-status-codes";
import { AxiosError } from "axios";

const getErrorMessageByStatusCodeCustom = (
  error: AxiosError,
  statusMap: Partial<Record<StatusCodes, string>>
): string => {
  const statusCode = error.response?.status as StatusCodes;

  if (statusCode && statusMap[statusCode]) {
    return statusMap[statusCode] as string;
  } else {
    return "Something wrong with the server, try again later";
  }
};

const getErrorMessageByStatusCodeDefault = (
  error: AxiosError,
  possibleStatusCodes: StatusCodes[]
) => {
  const statusMap = possibleStatusCodes.reduce((map, code) => {
    map[code] = error.response?.data as string;
    return map;
  }, {} as Partial<Record<StatusCodes, string>>);

  return getErrorMessageByStatusCodeCustom(error, statusMap);
};

export const getErrorMessage = (
  error: unknown,
  statusMap: Partial<Record<StatusCodes, string>> | StatusCodes[]
): string => {
  if (!(error instanceof AxiosError)) {
    console.log(error);

    return "Unknown error";
  }

  if (Array.isArray(statusMap)) {
    return getErrorMessageByStatusCodeDefault(error, statusMap);
  }

  return getErrorMessageByStatusCodeCustom(error, statusMap);
};
