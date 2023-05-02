import React, { useContext, useState } from "react";
import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, Provider } from "../../config/firebase-config";

import Button from "../UI/Button";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const [googleSigninError, setGoogleSigninError] = useState(null)
  const [isGoogleSigninLoading, setIsGoogleSigninLoading] = useState(false)

  const {
    setIsInputAuth,
    setCreateRoomError,
    setAuth
  } = useContext(CartContext);

  const signinWithGoogle = async () => {
    setIsGoogleSigninLoading(true);
    setIsInputAuth(false);
    setGoogleSigninError(null);
    setCreateRoomError(false);
    setIsGoogleSigninLoading(true);

    try {
      const response = await signInWithPopup(auth, Provider);
      // console.log(response.user);
      if (!response.user) {
        throw new Error("Failed to Login");
      }

      cookies.set("auth-token", auth.currentUser.refreshToken);
      setAuth(true);
      setIsGoogleSigninLoading(false);
      navigate("/enter-room");
      
    } catch (err) {
      console.error(err);
      setGoogleSigninError("Failed to login!");
      setIsGoogleSigninLoading(false);
    }
  };

  const loginWithGoogleBtn = (
    <span className="inline-flex flex-row flex-nowrap">
      Sign-up/Signin With
      <IconContext.Provider value={{ className: "react-icons-style" }}>
        <FcGoogle />
      </IconContext.Provider>
    </span>
  );

  const googleSignInBtnStyles =
    "bg-mildWhite text-main transition-all ease-in shadow-md font-semibold tracking-wide hover:bg-lightMain hover:text-mildWhite";

  return (
    <div>
      <Button
        type="submit"
        onSignIn={signinWithGoogle}
        styles={`${googleSignInBtnStyles} mt-4`}
      >
        {loginWithGoogleBtn}
      </Button>
      {isGoogleSigninLoading && !googleSigninError && (
        <h2 className="text-main text-center mt-3">Loading...</h2>
      )}
      {googleSigninError && (
        <h2 className="text-main text-center mt-3 text-black font-semibold">
          Failed to login!
        </h2>
      )}
    </div>
  );
};

export default GoogleSignInButton;
