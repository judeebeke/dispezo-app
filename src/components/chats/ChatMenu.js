import { IconContext } from "react-icons";
import {AiOutlineClose} from 'react-icons/ai'
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate} from 'react-router-dom'

import Button from "../UI/Button";
import { btnStyles } from "../../style";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const ChatMenu = ({deviceStyle}) => {
    
    const navigate = useNavigate();
    const isRoomCreator = useSelector(state => state.ui.currentRoom);
    const dispatch = useDispatch();
    
    const settingsBtnStyle = 'bg-transparent font-bold black-text hover-black transition-all ease-in hover:font-normal hover:shadow-md hover:bg-lightMain';

    const menuHandle = () => {
        dispatch(uiActions.setMenuOpen());
      };
    
    const logOutHandler = async () => {
        await signOut(auth)
        menuHandle()
        navigate('/')
        dispatch(uiActions.getEnteredRoom({enteredRoomStats: {}}))
        dispatch(uiActions.getAuthUser({authUser: null}))
      };

      const goToSettingsHandler = () => {
        navigate('/chat/chat-settings')
        dispatch(uiActions.setMenuOpen());
      }


    return (
    <section className={`${deviceStyle} menuAnimate`}>
       <button className="absolute top-3 right-4 md:hidden" onClick={menuHandle}>
          <IconContext.Provider value={{ className: "menu-icon" }}>
            <AiOutlineClose />
          </IconContext.Provider>
        </button>

       {auth.currentUser.uid === isRoomCreator.roomTrackingId && <Button styles={settingsBtnStyle} text="Settings" onSignIn={goToSettingsHandler} />}

        <Button styles={btnStyles}  text="Change Room" onSignIn={()=>{navigate("/enter-room")}} />

        <Button styles={btnStyles} text="Logout" onSignIn={logOutHandler} />
        <p className="md:text-mildWhite">{auth.currentUser.email}</p>
    </section>
  )
}

export default ChatMenu;
