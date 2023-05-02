import { useState, useCallback } from "react";

import CartContext from "./cart-context";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const CartProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isActivateMenu, setIsActivateMenu] = useState(false);
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [getRoomStats, setGetRoomStats] = useState({});
  const [isSignUpForm, setIsSignUpForm] = useState(true);
  const [createRoomError, setCreateRoomError] = useState(null);
  const [isInputAuth, setIsInputAuth] = useState(false);

  let authCookie = cookies.get("auth-token");

  const [isAuth, setIsAuth] = useState(authCookie);

  const IsSignUpFormHandler = (val) => {
    setIsSignUpForm(val);
  };

  const setAuthTokenHandler = (val) => {
    setIsAuth(val);
  };

 const setGetRoomStatsHandler = useCallback((val) => {
    setGetRoomStats(val);
  }, []);

  const setIsLoggedInHandler = (bool) => {
    setIsLoggedIn(bool);
  };

  const setIsSignUpHandler = (bool) => {
    setIsSignUp(bool);
  };

  const activateMenuHandler = (bool) => {
    setIsLoading(bool);
  };

  const currentTime = useCallback(() => {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let session = "AM";

    if (hh === 0) {
      hh = 12;
    }
    if (hh > 12) {
      hh = hh - 12;
      session = "PM";
    }

    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;

    let time = `${hh}:${mm} ${session}`;

    setTime(time);
    setTimeout(function () {
      currentTime();
    }, 1000);
  }, []);

  const chatContext = {
    loggin: isLoggedIn,
    logginHandler: setIsLoggedInHandler,
    createsRoom: isSignUp,
    setSignUpPage: setIsSignUpHandler,
    time,
    timeHandler: currentTime,
    isMenu: isActivateMenu,
    menuHandler: setIsActivateMenu,
    isLoading,
    loadingHandle: activateMenuHandler,
    isAuth,
    setAuth: setAuthTokenHandler,
    isSignUpForm,
    IsSignUpForm: IsSignUpFormHandler,
    createRoomError,
    setCreateRoomError,
    isInputAuth,
    setIsInputAuth,
    getRoomStats,
    setGetRoomStatsHandle: setGetRoomStatsHandler,
  };

  return (
    <CartContext.Provider value={chatContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
