import { IconContext } from "react-icons";
import {AiOutlineClose} from 'react-icons/ai'
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import {Link, useNavigate} from 'react-router-dom'

import Button from "../UI/Button";
import { btnStyles } from "../../style";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const ChatMenu = ({deviceStyle}) => {
    
    const navigate = useNavigate()
    const isRoomCreator = useSelector(state => state.ui.currentRoom)
    const dispatch = useDispatch()
    
    const settingsBtnStyle = 'bg-transparent font-bold black-text hover-black transition-all ease-in hover:font-normal hover:shadow-md hover:bg-lightMain';

    const menuHandle = () => {
        dispatch(uiActions.setMenuOpen());
      };
    
    const logOutHandler = async () => {
        await signOut(auth)
        menuHandle()
        navigate('/')
        dispatch(uiActions.getEnteredRoom({enteredRoomStats: {}}))
      };

      const changeRoomHandler = () => {
        navigate('/')
      }

    return (
    <section className={`${deviceStyle} menuAnimate`}>
       <button className="absolute top-3 right-4 md:hidden" onClick={menuHandle}>
          <IconContext.Provider value={{ className: "menu-icon" }}>
            <AiOutlineClose />
          </IconContext.Provider>
        </button>

       {auth.currentUser.uid === isRoomCreator.roomTrackingId && <Button styles={settingsBtnStyle} text="Settings" />}

        <Button styles={btnStyles} onSignIn={changeRoomHandler} >{ auth.currentUser.uid ? <Link to="/enter-room/joinRoom">Join Room</Link> : <Link to="/enter-room/createRoom">Create Room</Link>}</Button>

        <Button styles={btnStyles} text="Logout" onSignIn={logOutHandler} />
        <p>{auth.currentUser.email}</p>
    </section>
  )
}

export default ChatMenu;
