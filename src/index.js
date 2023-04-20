import React from 'react';
import { createRoot } from "react-dom/client";

import ContextProvider from './store/CartProvider';
import './index.css';
import App from './App';

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
  <ContextProvider>
    <App />
    </ContextProvider>
  </React.StrictMode>
);