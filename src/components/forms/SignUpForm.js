import React, { useState } from "react";

import Input from "../UI/Input";
import Button from "../UI/Button";
import useInputHook from "../customHooks/useInputHook";
import { btnStyles } from "../../style";
import { headerStyle } from "../../style";

const SignUpForm = (props) => {
  const [validateForm, setValidateForm] = useState(true)

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

  const formHandler = (e) => {
    e.preventDefault();

    if(!isPasswordValid || !isEmailValid) {
      setValidateForm(false)
        return;
    } else {
      props.signinHandler(
        emailInput,
        emailInputHandle,
        passwordInput,
        passwordInputHandle,
        emailValid,
        passwordValid
      );
      console.log("It made it here!")
    }

   
  };

  return (
    <form
      className="flex flex-col justify-between px-10 bg-mildWhite p-6"
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
      {!validateForm && !isEmailValid && <p className="w-full font-medium mb-2">Please enter a valid email!</p>}
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
       {!isPasswordValid && !validateForm && <p className="w-full font-medium">Please enter a valid password!</p>}
      <Button text="Signup" type="submit" styles={`${btnStyles} mt-8`} />
      {props.loading && (
        <h2 className="text-main text-center mt-3">Loading...</h2>
      )}
    </form>
  );
};

export default SignUpForm;
