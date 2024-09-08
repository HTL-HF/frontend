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
import CreateFormPage from "./views/CreateFromPage";
import paths from "./configs/pathsConfig";
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
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.register} element={<RegisterPage />} />
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.forms} element={<FormPage />} />
        <Route path={paths.createForm} element={<CreateFormPage />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
