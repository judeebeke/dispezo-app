import { useContext, useEffect } from "react";
import CartContext from "../../store/cart-context";
import { Outlet } from "react-router-dom";

import ChatMenu from "./ChatMenu";
import Overlay from "../UI/Overlay";


const ChatRoot = () => {
    const { timeHandler, isMenu, menuHandler, setAuth } =
    useContext(CartContext);

    
  useEffect(() => {
    timeHandler();
  }, [timeHandler]);

   let largeWindow = (
    <ChatMenu
      deviceStyle={`hidden flex-col justify-start items-center h-screen gap-y-4 pt-4 md:w-1/3 md:flex`}
      setIsAuth={setAuth}
    />
  );

  let smallWindow = (
    <ChatMenu
      deviceStyle={`absolute top-0 ${
        !isMenu ? "hidden -right-full" : "flex right-0"
      } bg-mildWhite flex-col justify-start items-center h-screen gap-y-4 pt-4 w-8/12 z-50 md:hidden`}
      setIsAuth={setAuth}
    />
  );

  let chatDisplay = "";

  if (window.screen.availWidth > 767) {
    chatDisplay = largeWindow;
  }

  if (window.screen.availWidth < 768) {
    chatDisplay = <Overlay onRun={menuHandler}>{smallWindow}</Overlay>;
  }


  return (
    <section
      className={`w-screen h-screen app-container-chat flex justify-center`}
    >
    {chatDisplay}
      <Outlet />
    </section>
  )
}

export default ChatRoot
