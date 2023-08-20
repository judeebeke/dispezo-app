import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Input from "../UI/Input";
import Button from "../UI/Button";
import useInputHook from "../customHooks/useInputHook";
import { btnStyles } from "../../style";
import { headerStyle } from "../../style";
import { uiActions } from "../../store/ui-slice";

const SignUpForm = () => {
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
  } = useInputHook((value) => value.match(mailformat) !== null);

  const {
    userInput: passwordInput,
    userInputHandler: passwordInputHandle,
    isInputValid: isPasswordValid,
    inputTouchHandler: passwordTouchHandle,
  } = useInputHook((value) => value.match(passw) !== null);

  const createDispezoAccountHandler = async (
    emailInput,
    emailInputHandle,
    passwordInput,
    passwordInputHandle
  ) => {
    setIsSignUpLoading(true);
    setSignUpError("");

    if (!emailInput || !passwordInput) {
      setIsSignUpLoading(false);
      return;
    }

    try {
      let userCredentials = await createUserWithEmailAndPassword(
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
      let errorCode = err.code;
      setSignUpError(`${errorCode}`);
      setIsSignUpLoading(false);
      return;
    }
  };

  const formHandler = (e) => {
    e.preventDefault();

    if (!isPasswordValid || !isEmailValid) {
      setValidateForm(false);
      return;
    }

    createDispezoAccountHandler(
      emailInput,
      emailInputHandle,
      passwordInput,
      passwordInputHandle
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
    <>
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
        {isSignUpLoading && !signUpError && (
          <h2 className="text-main text-center mt-3">Loading...</h2>
        )}
        {signUpError && (
          <h2 className="flex flex-wrap text-main text-center mt-3 mx-auto text-black font-semibold">
            {signUpError}
          </h2>
        )}
      </form>
    </>
  );
};

export default SignUpForm;
