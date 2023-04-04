import {useState, useCallback} from 'react';

import CartContext from './cart-context';

const CartProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isCreateRoom, setIsCreateRoom] = useState(false);
    const [isJoinRoom, setIsJoinRoom] = useState(false);
    const [isActivateMenu, setIsActivateMenu] = useState(true);
    const [time, setTime] = useState('')
    
    const setIsLoggedInHandler = (bool) => {
        setIsLoggedIn(bool)
    }

    const setIsSignUpHandler = (bool) => {
        setIsSignUp(bool)
    }

    const setisCreateRoomHandler = (bool) => {
        setIsCreateRoom(bool)
    }

    const setIsJoinRoomHandler = (bool) => {
        setIsJoinRoom(bool)
    }

    // const activateMenuHandler = (bool) => {
    //     setIsActivateMenu(bool)
    // }

const currentTime = useCallback(() => {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let session = "AM";

  if(hh === 0){
      hh = 12;
  }
  if(hh > 12){
      hh = hh - 12;
      session = "PM";
   }

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
    
   let time = `${hh}:${mm} ${session}`

   setTime(time)
  setTimeout(function(){ currentTime() }, 1000);
}, [])



    const chatContext = {
        loggin: isLoggedIn,
        logginHandler: setIsLoggedInHandler,
        createRoom: isCreateRoom,
        setCreateRoom: setisCreateRoomHandler,
        joinRoom: isJoinRoom,
        setJoinRoom: setIsJoinRoomHandler,
        createsRoom: isSignUp, 
        setSignUpPage: setIsSignUpHandler,
        time,
        timeHandler: currentTime,
        isMenu: isActivateMenu,
        menuHandler: setIsActivateMenu,
    }

    return (
        <CartContext.Provider value={chatContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;