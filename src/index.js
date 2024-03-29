import React from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter } from 'react-router-dom';

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
