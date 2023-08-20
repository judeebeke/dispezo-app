import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import useInputHook from "../customHooks/useInputHook";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { btnStyles } from "../../style";
import { headerStyle } from "../../style";
import { useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(null);
  const [isResetLoading, setIsResetLoading] = useState(false);

  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const navigate = useNavigate();

  const {
    userInput: emailInput,
    userInputHandler: emailInputHandle,
    isInputValid: isEmailValid,
    inputTouchHandler: emailTouchHandle,
    isInputTouched: isEmailTouched,
  } = useInputHook((value) => value.match(mailformat) !== null);

  const resetPasswordHandler = async (event) => {
    event.preventDefault();
    setResetError(null);
    setIsResetLoading(true);

    if (!emailInput) {
      setIsResetLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, emailInput);
      setResetSuccess("Successfully sent reset password link!");
      setIsResetLoading(false);

        setTimeout(() => {
            navigate('/login')
        }, 1500)
    } catch (error) {
      setResetError(error.code);
      setIsResetLoading(false);
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
            setResetError("");
          },
        }}
      />
      {isEmailTouched && !isEmailValid ? (
        <p className="w-full font-medium mb-2">Please enter a valid email!</p>
      ) : ""}

      <Button text="Reset" type="submit" styles={`${btnStyles} mt-8`} />
      
      {isResetLoading && (
        <h2 className="text-main text-center mt-3">Loading...</h2>
      )}

      {resetError && (
        <p className="flex flex-wrap text-md text-main text-center mt-3 mx-auto text-black font-semibold">
          {resetError}
        </p>
      )}
      {resetSuccess && (
        <p className="flex flex-wrap text-md text-main text-center mt-3 mx-auto text-black font-semibold">
          {resetSuccess}
        </p>
      )}
       <p className="flex flex-wrap text-blackis text-xs text-center mt-3 mx-auto text-black font-semibold">
          If you do not have an account click,<Link to="/signup" className="text-main underline"> create account</Link>
        </p>
    </form>
  );
};

export default ResetPassword;
