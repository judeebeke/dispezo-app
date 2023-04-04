import { useContext, useEffect } from "react";
import SignUp from "./SignUp";
import CartContext from "../store/cart-context";
import ChatRoom from "./chats/ChatRoom";
import ChatMenu from "./chats/ChatMenu";
import Overlay from "./UI/Overlay";

const Pages = () => {
  const { createRoom, joinRoom, timeHandler, isMenu, menuHandler } =
    useContext(CartContext);

    useEffect(() => {
        console.log(window.screen.width)
        timeHandler();
    }, [timeHandler])

    
    let largeWindow =  <ChatMenu deviceStyle={`hidden flex-col justify-start items-center h-screen gap-y-4 pt-4 md:w-1/3 md:flex`} />

    let smallWindow = <ChatMenu deviceStyle={`absolute top-0 ${!isMenu ? "hidden -right-full" : "flex right-0"} bg-mildWhite flex-col justify-start items-center h-screen gap-y-4 pt-4 w-8/12 z-50 md:hidden`}
            />
  
    let chatDisplay = '';

    if(window.screen.availWidth > 767) {
        chatDisplay = largeWindow;
    }

    if(window.screen.availWidth < 768) {
        chatDisplay = <Overlay onRun={menuHandler}>{smallWindow}</Overlay>
    }

return (
    <section
      className={`w-screen h-screen ${
        !createRoom && !joinRoom ? "app-container" : "app-container-chat"
      } flex justify-center`}
    >
        {!createRoom && !joinRoom ? "" : chatDisplay}
      {!createRoom && !joinRoom ? <SignUp /> : <ChatRoom />}
    </section>
  );
};

export default Pages;
