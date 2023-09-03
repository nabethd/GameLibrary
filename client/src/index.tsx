import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import queryClient from "./queries/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
