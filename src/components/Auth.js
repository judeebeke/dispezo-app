import React, { useContext } from "react";
import { auth, Provider } from "../config/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import useInputHook from "./customHooks/useInputHook";
import CartContext from "../store/cart-context";

import Input from "./UI/Input";
import Button from "./UI/Button";
import { btnStyles } from "../style";
import dispezoLogo from "../assets/dispezo-logo.png";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Auth = (props) => {
  const { userInput: emailInput, userInputHandler: emailInputHandle } =
    useInputHook((value) => value.length > 0);
  const { userInput: passwordInput, userInputHandler: passwordInputHandle } =
    useInputHook((value) => value.length > 8);
  const { isLoading, loadingHandle } = useContext(CartContext);
  const googleSignInBtnStyles =
    "bg-mildWhite text-main transition-all ease-in shadow-md hover:bg-lightMain hover:text-mildWhite";

  const signinDispezoHandler = async (e) => {
    loadingHandle(true);
    
    e.preventDefault();

    if (!emailInput && !passwordInput) {
      loadingHandle(false);
      return;
    }
    await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
    cookies.set("auth-token", auth.currentUser.refreshToken);
    props.setIsAuth(true)
    loadingHandle(false);
    emailInputHandle("");
    passwordInputHandle("");
  };

  const signinWithGoogle = async () => {
    await signInWithPopup(auth, Provider);
    cookies.set("auth-token", auth.currentUser.refreshToken);
    props.setIsAuth(true)
    emailInputHandle("");
    passwordInputHandle("");
    loadingHandle(false);
  };

  return (
    <section className="flex flex-col items-center app-container h-full py-4 gap-y-7">
      <img src={dispezoLogo} alt="Dispezo PNG" className="w-1/4" />

      <form
        className="flex flex-col justify-between px-10 bg-mildWhite p-6"
        onSubmit={signinDispezoHandler}
      >
        <Input
          label="Email"
          inputFor="user-email"
          input={{
            id: "user-email",
            type: "email",
            name: "useremail",
            value: emailInput,
            onChange: (e) => {
              emailInputHandle(e.target.value);
            },
          }}
        />
        <Input
          label="Password"
          inputFor="user-password"
          input={{
            id: "user-password",
            type: "password",
            name: "username",
            value: passwordInput,
            onChange: (e) => {
              passwordInputHandle(e.target.value);
            },
          }}
        />
        <Button text="Login" type="submit" styles={`${btnStyles} mt-8`} />
        {isLoading && (
          <h2 className="text-main text-center mt-3">Loading...</h2>
        )}
      </form>

      <Button
        text="Signup/SignIn With Google"
        type="submit"
        onSignIn={signinWithGoogle}
        styles={`${googleSignInBtnStyles} mt-4`}
      />
    </section>
  );
};

export default Auth;
