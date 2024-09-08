import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadUserFromToken } from "../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../types/actions";
import FormLayout from "../components/FormLayout";
import FormField from "../components/FormField";
import { useNotification } from "../hooks/notifications";
import { AppState } from "../store/rootReducer";
import paths from "../configs/pathsConfig";
import { getErrorMessage } from "../utils/notifications";
import { StatusCodes } from "http-status-codes";
import { sendRegister } from "../api/users";
import { SHA512 } from "../utils/encryption";

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
    try {

      await sendRegister(
        firstName,
        lastName,
        username,
        email,
        SHA512(password),
      )
      const user = loadUserFromToken();

      if (user) {
        dispatch(changeUser(user));
      }

      navigate(paths.createForm);
    } catch (err) {
      const statusMap = {
        [StatusCodes.CONFLICT]: "This email or username is already taken.",
      };

      showNotification(getErrorMessage(err, statusMap), "error");
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
