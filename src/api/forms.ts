import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const server = axios.create({
  baseURL:
    (import.meta.env.BACKEND_BASE_URL || "http://localhost:3000") + "/users",
});

const formsApi = {
  async deleteForm(id: string) {
    try {
      return (
        await server.delete("forms", {
          data: { id },
          headers: { Authorization: localStorage.getItem("token") },
        })
      ).data;
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.message, { type: "error" });
      }
    }
  },
};

export default formsApi;
