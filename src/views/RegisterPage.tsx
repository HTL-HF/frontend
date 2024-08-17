import {
  Container,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import users from "../api/users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SHA512 } from "../utils/encryption";

interface RegisterType {
  label: string;
  value: string;
  setFunction: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerFields: RegisterType[] = [
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

  const register = () => {
    const handleRegister = async () => {
      if (
        await users.register(
          firstName,
          lastName,
          username,
          email,
          SHA512(password)
        )
      ) {
        navigate("/forms");
      }
    };

    handleRegister();
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          register();
        }}
      >
        {registerFields.map((field, index) => (
          <FormControl
            key={index}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          >
            <InputLabel htmlFor={field.label}>{field.label}</InputLabel>
            <Input
              id={field.label}
              type={field.type}
              value={field.value}
              required
              onChange={(event) => field.setFunction(event.target.value)}
            />
          </FormControl>
        ))}

        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
