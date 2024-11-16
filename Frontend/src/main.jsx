import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </StrictMode>
);
