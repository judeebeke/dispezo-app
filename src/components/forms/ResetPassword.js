import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import useInputHook from "../customHooks/useInputHook";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { btnStyles } from "../../style";
import { headerStyle } from "../../style";

const ResetPassword = () => {
  const [resetError, setResetError] = useState("");
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const {
    userInput: emailInput,
    userInputHandler: emailInputHandle,
    isInputValid: isEmailValid,
    inputTouchHandler: emailTouchHandle,
    isFormValid: emailValid,
  } = useInputHook((value) => value.match(mailformat) !== null);

  const resetPasswordHandler = async () => {
    if (!emailInput) {
      setIsSignUpLoading(false);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, emailInput);
    } catch (error) {
      setResetError(error.code);
      setIsSignUpLoading(false);
      return;
    }
  };

  return (
    <form
      className="flex flex-col justify-between px-7 bg-mildWhite p-6"
      onSubmit={resetPasswordHandler}
    >
      <h2 className={headerStyle}>Enter Your Registered Email</h2>
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
            resetError("");
          },
        }}
      />
      {!emailValid && !isEmailValid && (
        <p className="w-full font-medium mb-2">Please enter a valid email!</p>
      )}

      <Button text="Login" type="submit" styles={`${btnStyles} mt-8`} />
      {isSignUpLoading && (
        <h2 className="text-main text-center mt-3">Loading...</h2>
      )}

      {resetError && (
        <p className="flex flex-wrap text-md text-main text-center mt-3 mx-auto text-black font-semibold">
          {resetError}
        </p>
      )}
    </form>
  );
};

export default ResetPassword;
