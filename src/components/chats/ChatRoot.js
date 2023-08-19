import {  useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import ChatMenu from "./ChatMenu";
import Overlay from "../UI/Overlay";


const ChatRoot = () => {
  const currentUser = useSelector(state => state.ui.user)
  const isMenuOpen = useSelector(state => state.ui.isMenuOpen)

  const navigate = useNavigate();

  useEffect(()=> {
    if(currentUser === null) {
      navigate('/')
    }
  })

   let largeWindow = (
    <ChatMenu
      deviceStyle={`hidden flex-col justify-start items-center h-screen gap-y-4 pt-4 md:w-1/3 md:flex`}
    />
  );

  let smallWindow = (
    <ChatMenu
      deviceStyle={`absolute top-0 ${
        !isMenuOpen ? "hidden -right-full" : "flex right-0"
      } bg-mildWhite flex-col justify-start items-center h-screen gap-y-4 pt-4 w-8/12 z-50 md:hidden`}
    />
  );

  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
    }
    const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
    }


  return (
    <section
      className={`w-screen h-screen app-container-chat flex justify-center`}
    >
    <Default>{largeWindow }</Default>
    <Mobile>{<Overlay>{smallWindow}</Overlay>}</Mobile>
      <Outlet />
    </section>
  )
}

export default ChatRoot
