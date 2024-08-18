// index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import NotificationProvider from "./components/NotificationContext"; // Ensure the correct path
import "react-toastify/dist/ReactToastify.css";
import theme from "./themes/mainTheme";

const store = configureStore({ reducer: rootReducer });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>
);
