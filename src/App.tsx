import { Route, Routes } from "react-router-dom";
import RegisterPage from "./views/RegisterPage";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeUser } from "./types/actions";
import { jwtDecode } from "jwt-decode";
import User from "./types/user";
import HomePage from "./views/HomePage";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode<User>(token);

      dispatch(changeUser(user));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
