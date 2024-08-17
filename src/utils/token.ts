import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import User from "../types/user";

export const loadUserFromToken = () => {
    const token = Cookies.get("token");
    if (token) {
        return jwtDecode<User>(token);
    }
};
