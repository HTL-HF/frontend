import { server } from "../configs/axiosConfig";
import { FormModel } from "../types/form";

export const sendDeleteForm = async (id: string) =>
  (await server.delete<string>(`/forms/${id}`)).data;

export const sendCreateForm = async (form: FormModel) => {
  await server.post("/forms", form);
};

export const sendGetForm = async (
  id: string,
  showNotification: (message: string, severity: AlertColor) => void,
  navigator: (path: string) => void
) => {
  try {
    return (await server.get(`/forms/${id}`)).data;
  } catch (err) {
    if (err instanceof AxiosError) {
      showError(
        err,
        {
          [StatusCodes.UNAUTHORIZED]: "You need to login",
        },
        showNotification
      );
      if (err.response?.status == StatusCodes.NOT_FOUND) {
        navigator("/404");
      }
    }
  }
};
