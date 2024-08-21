import { Container, Typography, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../store/rootReducer";

const HomePage = () => {
  const user = useSelector((state: AppState) => state.user);

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
          to={!user ? "/login" : "/forms"}
        >
          {!user ? <div>login</div> : <div>forms</div>}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: "150px" }}
          component={Link}
          to={!user?"/register":"forms/create"}
        >
          {!user ? <div>register</div> : <div>create form</div>}
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
