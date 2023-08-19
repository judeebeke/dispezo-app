import { IconContext } from "react-icons";
import {AiOutlineClose} from 'react-icons/ai'
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate} from 'react-router-dom';
import dispezoLogo from "../../assets/dispezo-logo.png";

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

        <img src={dispezoLogo} className="flex w-20 h-auto absolute top-3 left-4 md:hidden" alt="DISPEZO ICON" />
     
       {auth.currentUser.uid === isRoomCreator.roomTrackingId && <Button styles={settingsBtnStyle} text="Settings" onSignIn={goToSettingsHandler} />}

        <Button styles={btnStyles}  text="Change Room" onSignIn={()=>{navigate("/enter-room")}} />

        <Button styles={btnStyles} text="Logout" onSignIn={logOutHandler} />
        <p className="break-words md:text-mildWhite">{auth.currentUser.email}</p>

        <p className="mt-4 text-center md:text-mildWhite text-xs break-words w-full px-3"><strong >Note:</strong> Get created room id and passcode in the <em className="font-bold">'Settings' </em> {" "} page, and store somewhere easily accessible and safe.</p>
    </section>
  )
}

export default ChatMenu;
