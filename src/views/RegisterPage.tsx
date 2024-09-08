import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SHA512 } from "../utils/encryption";
import { loadUserFromToken } from "../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../types/actions";
import FormLayout from "../components/FormLayout";
import FormField from "../components/FormField";
import { useNotification } from "../hooks/notifications";
import { sendRegister } from "../api/users";
import { AppState } from "../store/rootReducer";
import paths from "../configs/pathsConfig";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const user = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (user) {
      showNotification("you are already logged in", "error");
      navigate(paths.home);
    }
  }, [showNotification, navigate, user]);

  const register = async () => {
    if (
      await sendRegister(
        firstName,
        lastName,
        username,
        email,
        SHA512(password),
        showNotification
      )
    ) {
      const user = loadUserFromToken();
      if (user) {
        dispatch(changeUser(user));
      }
      navigate(paths.createForm);
    }
  };

  const registerFields = [
    {
      label: "First name",
      value: firstName,
      setFunction: setFirstName,
      type: "text",
    },
    {
      label: "Last name",
      value: lastName,
      setFunction: setLastName,
      type: "text",
    },
    { label: "Email", value: email, setFunction: setEmail, type: "email" },
    {
      label: "Username",
      value: username,
      setFunction: setUsername,
      type: "text",
    },
    {
      label: "Password",
      value: password,
      setFunction: setPassword,
      type: "password",
    },
  ];

  return (
    <FormLayout title="Register" onSubmit={register} buttonText="Sign Up">
      {registerFields.map((field, index) => (
        <FormField
          key={index}
          label={field.label}
          value={field.value}
          type={field.type}
          onChange={field.setFunction}
        />
      ))}
    </FormLayout>
  );
};

export default RegisterPage;
