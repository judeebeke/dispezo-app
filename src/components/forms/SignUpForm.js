import React, { useState, useContext } from "react";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import CartContext from "../../store/cart-context";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Input from "../UI/Input";
import Button from "../UI/Button";
import useInputHook from "../customHooks/useInputHook";
import { btnStyles } from "../../style";
import { headerStyle } from "../../style";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const SignUpForm = () => {
  const [validateForm, setValidateForm] = useState(true);
  const {
    isLoading,
    loadingHandle,
    setAuth,
    setCreateRoomError,
    createRoomError,
    setIsInputAuth,
    inputAuth,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;
  const {
    userInput: emailInput,
    userInputHandler: emailInputHandle,
    isInputValid: isEmailValid,
    inputTouchHandler: emailTouchHandle,
    isFormValid: emailValid,
  } = useInputHook((value) => value.match(mailformat) !== null);

  const {
    userInput: passwordInput,
    userInputHandler: passwordInputHandle,
    isInputValid: isPasswordValid,
    inputTouchHandler: passwordTouchHandle,
    isFormValid: passwordValid,
  } = useInputHook((value) => value.match(passw) !== null);

  const signinDispezoHandler = async (
    emailInput,
    emailInputHandle,
    passwordInput,
    passwordInputHandle
  ) => {
    loadingHandle(true);
    setIsInputAuth(true);
    
    if (!emailInput || !passwordInput) {
      loadingHandle(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      cookies.set("auth-token", auth.currentUser.refreshToken);
      setAuth(true);
      loadingHandle(false);
      emailInputHandle("");
      passwordInputHandle("");
      navigate("/enter-room");
    } catch (err) {
      console.error(err);
      setCreateRoomError("Error: Failed to create new account!");
      loadingHandle(false);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();

    setCreateRoomError(false)

    if (!isPasswordValid || !isEmailValid) {
      setValidateForm(false);
      return;
    }
    signinDispezoHandler(
      emailInput,
      emailInputHandle,
      passwordInput,
      passwordInputHandle,
      emailValid,
      passwordValid
    );
  };

  const passwordError = (
    <>
      {" "}
      <p className="text-sm font-semibold">
        Password must contain the following:
      </p>
      <ul className="text-xs font-medium">
        <li>First Charater must be a letter</li>
        <li>Must contain an Uppercase and a Lowercase letter</li>
        <li>Must contain a number</li>
        <li>Must contain a non-alphanumeric character</li>
        <li>Password must not be less than 7</li>
      </ul>
    </>
  );

  return (
    <form
      className="flex flex-col justify-between px-7 bg-mildWhite p-6"
      onSubmit={formHandler}
    >
      <h2 className={headerStyle}>Create a new Dispezo Account</h2>
      <Input
        label="Email"
        inputFor="user-email"
        input={{
          id: "user-email",
          type: "email",
          name: "useremail",
          onBlur: emailTouchHandle,
          value: emailInput,
          onChange: (e) => {
            emailInputHandle(e.target.value);
          },
        }}
      />
      {!validateForm && !isEmailValid && (
        <p className="text-sm font-semibold">Please enter a valid email!</p>
      )}
      <Input
        label="Password"
        inputFor="user-password"
        input={{
          id: "user-password",
          type: "password",
          name: "username",
          onBlur: passwordTouchHandle,
          value: passwordInput,
          onChange: (e) => {
            passwordInputHandle(e.target.value);
          },
        }}
      />
      {!isPasswordValid && !validateForm && passwordError}
      <Button text="Signup" type="submit" styles={`${btnStyles} mt-8`} />
      {isLoading && !createRoomError && <h2 className="text-main text-center mt-3">Loading...</h2>}

      {createRoomError && !inputAuth && (
        <h2 className="text-main text-center mt-3 text-black font-semibold">
          Failed to login!
        </h2>
      )}
    </form>
  );
};

export default SignUpForm;
