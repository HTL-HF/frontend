import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { AppState } from "../store/rootReducer";
import { changeUser } from "../types/actions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);

  const logout = () => {
    Cookies.remove("token"); 

    dispatch(changeUser(null));

    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          {user ? (
            <>
              <Button color="inherit" onClick={() => navigate("/forms")}>
                Forms
              </Button>
              <Button color="inherit" onClick={() => navigate("/forms/create")}>
                Create Form
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Box>

        {user && (
          <Box>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
