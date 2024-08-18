import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SHA512 } from "../utils/encryption";
import { loadUserFromToken } from "../utils/token";
import { useDispatch } from "react-redux";
import { changeUser } from "../types/actions";
import FormLayout from "../components/FormLayout";
import FormField from "../components/FormField";
import { useNotification } from "../components/NotificationContext";
import { sendRegister } from "../api/users";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

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
      navigate("/forms");
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
