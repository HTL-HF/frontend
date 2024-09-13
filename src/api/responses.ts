import { server } from "../configs/axiosConfig";
import { ResponseModal } from "../types/response";

export const sendResponse = async (formId: string, response: ResponseModal) => {
  await server.post(`/forms/${formId}/responses`, response);
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
