import { Route, Routes } from "react-router-dom";
import RegisterPage from "./views/RegisterPage";
import { ToastContainer } from "react-toastify";

import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import { useEffect } from "react";
import { loadUserFromToken } from "./utils/token";
import { useDispatch } from "react-redux";
import { changeUser } from "./types/actions";
import FormsPage from "./views/FormsPage";
import CreateFormPage from "./views/CreateFromPage";
import FormPage from "./views/FormPage";
import PageNotFoundPage from "./views/PageNotFoundPage";
import Navbar from "./components/Navbar";
import ResponsesPage from "./views/ResponsesPage";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = loadUserFromToken();
    if (user) {
      dispatch(changeUser(user));
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/forms/create" element={<CreateFormPage />} />
        <Route path="/forms/:id" element={<FormPage />} />
        <Route path="/forms/:id/responses" element={<ResponsesPage />} />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
