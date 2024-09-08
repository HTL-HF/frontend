import { server } from "../configs/axiosConfig";

export const sendRegister = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
) => {
  await server.post<{ id: string; token: string }>("/users/register", {
    firstName,
    lastName,
    username,
    email,
    password,
  });
};

export const sendLogin = async (username: string, password: string) => {
  await server.post<{ id: string; token: string }>("/users/login", {
    username,
    password,
  });
};

export const sendGetForms = async () => (await server.get("/users/forms")).data;
