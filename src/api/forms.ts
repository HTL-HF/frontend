import { server } from "../configs/axiosConfig";
import { FormModel } from "../types/form";

export const sendDeleteForm = async (id: string) =>
  (await server.delete<string>(`/forms/${id}`)).data;

export const sendCreateForm = async (form: FormModel) => {
  await server.post("/forms", form);
};
