import React from 'react';
import { createRoot } from "react-dom/client";
// import { BrowserRouter } from 'react-router-dom';

import ContextProvider from './store/CartProvider';
import './index.css';
import App from './App';

const root = createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
  <ContextProvider>
  {/* <BrowserRouter> */}
  <App />
    {/* </BrowserRouter> */}
    </ContextProvider>
  </React.StrictMode>
);