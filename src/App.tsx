import { Route, Routes } from "react-router-dom";
import RegisterPage from "./views/RegisterPage";
import { ToastContainer } from "react-toastify";

import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import { useEffect } from "react";
import { loadUserFromToken } from "./utils/token";
import { useDispatch } from "react-redux";
import { changeUser } from "./types/actions";
import FormPage from "./views/FormsPage";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = loadUserFromToken();
    if (user) {
      dispatch(changeUser(user));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forms" element={<FormPage />} />
        <Route path="/forms/create" element={<FormPage />} />

      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
