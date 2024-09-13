import { AlertColor } from "@mui/material";
import { server } from "../configs/axiosConfig";
import { ResponseModal } from "../types/response";

export const sendResponse = async (formId: string, response: ResponseModal) => {
  await server.post(`/forms/${formId}/responses`, response);
};

export const sendGetResponses = async (formId: string) => {
  return (
    await server.get(`/forms/${formId}/responses`, { withCredentials: true })
  ).data;
};

export const sendDeleteResponse = async (
  formId: string,
  responseId: string,
) => {
  await server.delete(`/forms/${formId}/responses/${responseId}`, {
    withCredentials: true,
  });
};
