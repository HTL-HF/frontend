import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SHA512 } from "../utils/encryption";
import { sendLogin } from "../api/users";
import { loadUserFromToken } from "../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../types/actions";
import FormLayout from "../components/FormLayout";
import FormField from "../components/FormField";
import { useNotification } from "../hooks/notifications";
import { AppState } from "../store/rootReducer";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const user = useSelector((state: AppState) => state.user);

  const handleLogin = async () => {
    if (await sendLogin(username, SHA512(password), showNotification)) {
      const user = loadUserFromToken();
      if (user) {
        dispatch(changeUser(user));
      }
      navigate("/forms");
    }
  };

  useEffect(() => {
    if (user) {
      showNotification("You are already logged in", "error");
      navigate("/");
    }
  }, []);

  return (
    <FormLayout title="Login" onSubmit={handleLogin} buttonText="Login">
      <FormField
        label="Username"
        value={username}
        type="text"
        onChange={setUsername}
      />
      <FormField
        label="Password"
        value={password}
        type="password"
        onChange={setPassword}
      />
    </FormLayout>
  );
};

export default LoginPage;
