import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { InventoryProvider } from "./context/InventoryContext";
import { HistoryProvider } from "./context/HistoryContext";
import { StoreProvider } from "./context/StoreContext";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light", // change to "dark" for dark mode
        primaryColor: "violet",
      }}
    >
      <HistoryProvider>
        <StoreProvider>
          <AuthProvider>
            <InventoryProvider>
              <App />
            </InventoryProvider>
          </AuthProvider>
        </StoreProvider>
      </HistoryProvider>
    </MantineProvider>
  </React.StrictMode>,
);
