import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <ThemeProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProvider>
  </DataProvider>
);
