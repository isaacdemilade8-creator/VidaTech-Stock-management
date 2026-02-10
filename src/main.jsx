import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { InventoryProvider } from "./context/InventoryContext";
import { HistoryProvider } from "./context/HistoryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <InventoryProvider>
        <HistoryProvider>
          <App />
        </HistoryProvider>
      </InventoryProvider>
    </AuthProvider>
  </React.StrictMode>
);
