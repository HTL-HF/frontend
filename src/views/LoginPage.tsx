import { useState } from "react";
import { Container, Button, Box, Typography, FormControl, InputLabel, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SHA512 } from "../utils/encryption";
import users from "../api/users";
import { useDispatch } from "react-redux";
import { changeUser } from "../types/actions";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    const login = async () => {
      const response = await users.login(username, SHA512(password));

      if (response) {
        dispatch(changeUser(response.user));
        localStorage.setItem("token", response.token);
        navigator("/forms");
      }
    };

    login();
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin();
        }}
      >
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>

        <Box mt={3}>
          <Button fullWidth variant="contained" color="primary" size="large" type="submit">
            LOGIN
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
