import { useContext} from "react";
import { IconContext } from "react-icons";
import {AiOutlineClose} from 'react-icons/ai'
import CartContext from "../../store/cart-context";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import {Link, useNavigate} from 'react-router-dom'

import Button from "../UI/Button";
import { btnStyles } from "../../style";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const ChatMenu = ({deviceStyle, setIsAuth}) => {
    const { logginHandler, menuHandler, setIsCreateRoom, getRoomStats, setGetRoomStatsHandle, setIsJoinRoom ,  } = useContext(CartContext);
    const navigate = useNavigate()

    const settingsBtnStyle = 'bg-transparent font-bold black-text hover-black transition-all ease-in hover:font-normal hover:shadow-md hover:bg-lightMain';

    const menuHandle = () => {
        menuHandler(prev => {
            return ( !prev )
        })
      };
    
    const logOutHandler = async () => {
        await signOut(auth)
        logginHandler(false);
        menuHandle()
        setIsAuth(false)
        setIsCreateRoom(false)
        cookies.remove("auth-token")
        cookies.remove("create-token")
        cookies.remove("join-token")
        navigate('/')
        setGetRoomStatsHandle({})
      };

      const changeRoomHandler = () => {
        cookies.remove("create-token")
        cookies.remove("join-token")
        setGetRoomStatsHandle({})
        setIsJoinRoom(false)
        setIsCreateRoom(false)
      }

    return (
    <section className={`${deviceStyle} menuAnimate`}>
       <button className="absolute top-3 right-4 md:hidden" onClick={menuHandle}>
          <IconContext.Provider value={{ className: "menu-icon" }}>
            <AiOutlineClose />
          </IconContext.Provider>
        </button>

        <Button styles={settingsBtnStyle} text="Settings" />

        <Button styles={btnStyles} onSignIn={changeRoomHandler} >{getRoomStats.roomTrackingId === auth.currentUser.uid ? <Link to="/enter-room/joinRoom">Join Room</Link> : <Link to="/enter-room/createRoom">Create Room</Link>}</Button>

        <Button styles={btnStyles} text="Logout" onSignIn={logOutHandler} />
        <p>{auth.currentUser.email}</p>
    </section>
  )
}

export default ChatMenu;
