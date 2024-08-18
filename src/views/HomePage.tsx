import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container
      maxWidth="sm"
      style={{ textAlign: "center", marginTop: "100px" }}
    >
      <Typography variant="h1" gutterBottom>
        Welcome to Atmors
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ marginRight: "20px", width: "150px" }}
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: "150px" }}
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
