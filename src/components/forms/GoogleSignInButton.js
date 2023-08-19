import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
} from "firebase/auth";
import { auth, Provider } from "../../config/firebase-config";

import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleSigninError, setGoogleSigninError] = useState(null);
  const [isGoogleSigninLoading, setIsGoogleSigninLoading] = useState(false);

  const signinWithGoogle = async () => {
    setIsGoogleSigninLoading(true);
    setGoogleSigninError(null);

    try {
      let result = await signInWithPopup(auth, Provider);

      dispatch(uiActions.getAuthUser({authUser: result.user.uid}))
      setIsGoogleSigninLoading(false);
      navigate("/enter-room");
    } catch (err) {
      setGoogleSigninError(err.code);
      console.log(err.message);
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
    <div className="hidden md:flex">
      <Button
        type="submit"
        onSignIn={signinWithGoogle}
        styles={`${googleSignInBtnStyles} mt-4`}
      >
        {loginWithGoogleBtn}
      </Button>
      {isGoogleSigninLoading && (
        <h2 className="text-main text-center mt-3">Loading...</h2>
      )}
      {googleSigninError && (
        <h2 className="text-main text-center mt-3 text-black font-semibold">
          {googleSigninError}
        </h2>
      )}
    </div>
  );
};

export default GoogleSignInButton;
