import React, { useContext, useState } from "react";
import { auth, Provider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import CartContext from "../store/cart-context";
import { IconContext } from "react-icons";

import Button from "./UI/Button";
import { FcGoogle } from "react-icons/fc";
import SignUpForm from "./forms/SignUpForm";
import SignInForm from "./forms/SignInForm";
import dispezoLogo from "../assets/dispezo-logo.png";
import Cookies from "universal-cookie";
// import SignUp from './SignUp';
const cookies = new Cookies();

const Auth = (props) => {
  const { isLoading, loadingHandle, isSignUpForm, IsSignUpForm } =
    useContext(CartContext);

  const [createRoomError, setCreateRoomError] = useState(null);
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const [isInputAuth, setIsInputAuth] = useState(false);

  const signinDispezoHandler = async (
    emailInput,
    emailInputHandle,
    passwordInput,
    passwordInputHandle
  ) => {
    loadingHandle(true);
    setIsInputAuth(true)
    setIsGoogleSignIn(false)

    if (!emailInput || !passwordInput) {
      loadingHandle(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      cookies.set("auth-token", auth.currentUser.refreshToken);
      props.setIsAuth(true);
      loadingHandle(false);
      emailInputHandle("");
      passwordInputHandle("");
    } catch (err) {
      console.error(err);
      setCreateRoomError("Error: Failed to create new account!");
      loadingHandle(false);
    }
  };

  const loginDispezoHandler = async (
    emailInput,
    emailInputHandle,
    passwordInput,
    passwordInputHandle
  ) => {
    loadingHandle(true);
    setIsInputAuth(true)
    setIsGoogleSignIn(false)

    if (!emailInput && !passwordInput) {
      loadingHandle(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      props.setIsAuth(true);
      cookies.set("auth-token", auth.currentUser.refreshToken);
      loadingHandle(false);
      emailInputHandle("");
      passwordInputHandle("");
    } catch (err) {
      console.error(err);
      setCreateRoomError("Failed to login!");
      loadingHandle(false);
    }
  };

  const signinWithGoogle = async () => {
    loadingHandle(true);
    setIsGoogleSignIn(true)
    setIsInputAuth(false)

    try {
      const response = await signInWithPopup(auth, Provider);
      console.log(response.user);
      if (!response.user) {
        return;
      }
      cookies.set("auth-token", auth.currentUser.refreshToken);
      props.setIsAuth(true);
      loadingHandle(false);
    } catch (err) {
      console.error(err);
      setCreateRoomError("Failed to login!");
      loadingHandle(false);
    }
  };

  const googleSignInBtnStyles =
    "bg-mildWhite text-main transition-all ease-in shadow-md hover:bg-lightMain hover:text-mildWhite font-semibold tracking-wide";

  const loginWithGoogleBtn = (
    <span className="inline-flex flex-row flex-nowrap">
      Signu/SignIn With
      <IconContext.Provider value={{ className: "react-icons-style" }}>
        <FcGoogle />
      </IconContext.Provider>
    </span>
  );

  return (
    <section className="flex flex-col items-center app-container h-full pt-9 gap-y-7">
      <img src={dispezoLogo} alt="Dispezo PNG" className="w-2/4 md:w-1/4" />

      {isSignUpForm ? (
        <>
          <SignUpForm
            signinHandler={signinDispezoHandler}
            loading={isLoading}
          />
          {createRoomError && isInputAuth && (
            <h2 className="text-main text-center text-black font-semibold">
              Failed to create new account!
            </h2>
          )}
          <h2>
            <button
              className="text-main hover:text-lightMain"
              onClick={() => {
                IsSignUpForm(false);
              }}
            >
              Login
            </button>{" "}
            instead
          </h2>
        </>
      ) : (
        <>
          <SignInForm
            loginHandler={loginDispezoHandler}
            loading={isLoading}
          />
          {createRoomError && isInputAuth && (
            <h2 className="text-main text-center mt-1 text-black font-semibold">
              Failed to login!
            </h2>
          )}
          <h2>
            <button
              className="text-main hover:text-lightMain"
              onClick={() => {
                IsSignUpForm(true);
              }}
            >
              Create Account
            </button>{" "}
            if you do not have one
          </h2>
        </>
      )}

      <Button
        type="submit"
        onSignIn={signinWithGoogle}
        styles={`${googleSignInBtnStyles} mt-4`}
      >
        {loginWithGoogleBtn}
      </Button>
      {isLoading && !createRoomError && (
        <h2 className="text-main text-center mt-3">Loading...</h2>
      )}
      {createRoomError && isGoogleSignIn && (
        <h2 className="text-main text-center mt-3 text-black font-semibold">
          Failed to login!
        </h2>
      )}
    </section>
  );
};

export default Auth;
