import React, { Fragment, useContext } from "react";
import Pages from "./components/pages";
import Auth from "./components/Auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/UI/ErrorPage";
import EnterRoomPage from "./components/EnterRoomPage";

import SignUpForm from "./components/forms/SignUpForm";
import SignInForm from "./components/forms/SignInForm";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import ChatRoom from "./components/chats/ChatRoom";
import ChatErrorPage from "./components/chats/ChatErrorPage";
import ChatRoot from "./components/chats/ChatRoot";
import CartContext from './store/cart-context';

const App = () => {
  // const {isAuth} = useContext(CartContext);

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
      element: <Pages />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <EnterRoomPage />,
        },
        {
          path: "/enter-room/joinRoom",
          element: <JoinRoom />,
        },
        {
          path: "/enter-room/createRoom",
          element: <CreateRoom />,
        },
      ],
    },
    {
      path:  "/chat",
      element: <ChatRoot />,
      errorElement: <ChatErrorPage />,
      children: [
        {
          index: true,
          element: <ChatRoom />,
        },
      ],
    },
  ]);
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
};

export default App;
