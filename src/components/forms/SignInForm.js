import React, { useState } from "react";
import { useDispatch } from "react-redux";

import useInputHook from "../customHooks/useInputHook";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { Link, useNavigate } from "react-router-dom";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { btnStyles } from "../../style";
import { headerStyle } from "../../style";
import { uiActions } from "../../store/ui-slice";

const SignInForm = (props) => {
  const [validateForm, setValidateForm] = useState(true);
  const [signUpError, setSignUpError] = useState("");
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const dispatch = useDispatch();

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

  const loginDispezoHandler = async (
    emailInput,
    emailInputHandle,
    passwordInput,
    passwordInputHandle
  ) => {
    setIsSignUpLoading(true);
    setSignUpError("");

    if (!emailInput && !passwordInput) {
      setIsSignUpLoading(false);
      return;
    }
    try {
      let userCredentials = await signInWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput
      );
      dispatch(uiActions.getAuthUser({ authUser: userCredentials.user.uid }));

      setIsSignUpLoading(false);
      emailInputHandle("");
      passwordInputHandle("");
      navigate("/enter-room");
    } catch (err) {
      setSignUpError(`${err.code}`);
      setIsSignUpLoading(false);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();

    if (!passwordValid && !emailValid) {
      setValidateForm(false);
      return;
    }

    loginDispezoHandler(
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
        Please password must contain the following:
      </p>
      <ul className="text-xs font-medium">
        <li>Must contain a Uppercase letter</li>
        <li>Must contain a Lowercase letter</li>
        <li>Must contain a number</li>
        <li>Must contain a non-alphanumeric character</li>
        <li>Password must not be less than 7</li>
      </ul>
    </>
  );

  return (
    <>
      <form
        className="flex flex-col justify-between px-7 bg-mildWhite p-6"
        onSubmit={formHandler}
      >
        <h2 className={headerStyle}>Login to your Dispezo Account</h2>
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
              setSignUpError("");
            },
          }}
        />
        {!validateForm && !isEmailValid && (
          <p className="w-full font-medium mb-2">Please enter a valid email!</p>
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
              setSignUpError("");
              passwordInputHandle(e.target.value);
            },
          }}
        />
        {!isPasswordValid && !validateForm && passwordError}

        <Button text="Login" type="submit" styles={`${btnStyles} mt-8`} />
        {isSignUpLoading && !signUpError && (
          <h2 className="text-main text-center mt-3">Loading...</h2>
        )}

        {signUpError && (
          <p className="flex flex-wrap text-md text-main text-center mt-3 mx-auto text-black font-semibold">
            {signUpError}
          </p>
        )}
        <p className="flex flex-wrap text-blackis text-xs text-center mt-3 mx-auto text-black font-semibold">
          If you forgot your password click,
          <Link to="/reset-password" className="text-main underline">
            {" "}
            reset password
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignInForm;
