import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { server } from "../configs/axiosConfig";

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
