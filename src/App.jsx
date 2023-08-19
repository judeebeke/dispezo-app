import React, { Fragment } from "react";
import Pages from "./components/pages";
import Auth from "./components/Auth";
import Root from "./components/Root";
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
import ChatSettings from "./components/chats/ChatSettings";
import ResetPassword from "./components/forms/ResetPassword";

const App = () => {
  // const {isAuth} = useContext(CartContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: "/",
          element: <Auth />,
          children: [
            {
              path: "/signup",
              element: <SignUpForm />,
            },
            {
              path: "/login",
              element: <SignInForm />,
            },
            {
              path: "/reset-password",
              element: <ResetPassword />,
            },
          ],
        },
        {
          path: "/enter-room",
          element: <Pages />,
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
          path: "/chat",
          element: <ChatRoot />,
          errorElement: <ChatErrorPage />,
          children: [
            {
              index: true,
              element: <ChatRoom />,
            },
            {
              path: "/chat/chat-settings",
              element: <ChatSettings />
            }
          ],
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
