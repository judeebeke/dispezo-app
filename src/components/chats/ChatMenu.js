import { useContext} from "react";
import { IconContext } from "react-icons";
import {AiOutlineClose} from 'react-icons/ai'
import CartContext from "../../store/cart-context";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

import Button from "../UI/Button";
import { btnStyles } from "../../style";

import Cookies from "universal-cookie";
const cookies = new Cookies();


const ChatMenu = ({deviceStyle, setIsAuth}) => {
    const { logginHandler, setCreateRoom, setJoinRoom, setSignUpPage, menuHandler } = useContext(CartContext);

    const settingsBtnStyle = 'bg-transparent font-bold black-text hover-black transition-all ease-in hover:font-normal hover:shadow-md hover:bg-lightMain';

    const menuHandle = () => {
        menuHandler(prev => {
            return ( !prev )
        })
      };
    
    const logOutHandler = async () => {
        await signOut(auth)
        setCreateRoom(false);
        logginHandler(false);
        setJoinRoom(false);
        setSignUpPage(false);
        menuHandle()
        setIsAuth(false)
        cookies.remove("auth-token")
      };

    return (
    <section className={`${deviceStyle} menuAnimate`}>
       <button className="absolute top-3 right-4 md:hidden" onClick={menuHandle}>
          <IconContext.Provider value={{ className: "menu-icon" }}>
            <AiOutlineClose />
          </IconContext.Provider>
        </button>

        <Button styles={settingsBtnStyle} text="Settings" />

        <Button styles={btnStyles} text="Join Room" />

        <Button styles={btnStyles} text="Logout" onSignIn={logOutHandler} />
    </section>
  )
}

export default ChatMenu;
