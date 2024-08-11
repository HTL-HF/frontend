import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { users } from "../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const register = () => {
    const handleRegister = async () => {
      const response = await users.register(
        firstName,
        lastName,
        username,
        email,
        password
      );
      
      if (response) {
        navigator("/");
      }
    };

    handleRegister();
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
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
        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          variant="outlined"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          variant="outlined"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
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
