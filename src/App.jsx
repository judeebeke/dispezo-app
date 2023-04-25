import React, { Fragment, useContext } from "react";
import Pages from "./components/pages";
import Auth from "./components/Auth";
import CartContext from "./store/cart-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { auth } from "./config/firebase-config";
import ErrorPage from "./components/UI/ErrorPage";

import SignUpForm from "./components/forms/SignUpForm";
import SignInForm from "./components/forms/SignInForm";

const App = () => {
  const { isAuth } = useContext(CartContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/signup",
          element: <SignUpForm />,
        },
        {
          path: "/login",
          element: <SignInForm />,
        },
      ],
    },
    {
      path: "/enter-room",
      element: isAuth && <Pages setIsAuth={isAuth} />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
};

export default App;
