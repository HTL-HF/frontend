import { server } from "../configs/axiosConfig";
import { ResponseModal } from "../types/response";

export const sendResponse = async (formId: string, response: ResponseModal) => {
  await server.post(`/forms/${formId}/responses`, response);
};
