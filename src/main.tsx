import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import NotificationProvider from "./components/NotificationContext";
import "react-toastify/dist/ReactToastify.css";
import theme from "./themes/mainTheme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const store = configureStore({ reducer: rootReducer });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LocalizationProvider>
        </Provider>
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>
);
