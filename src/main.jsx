import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// Disabling React Dev Tools in Production
if (import.meta.env.MODE === "production") disableReactDevTools();

// Selecting the Root Element
const rootElement = document.getElementById("root");

// Creating the React Root
const root = ReactDOM.createRoot(rootElement);

// Rendering the App
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
