import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import GoogleSignInButton from "./forms/GoogleSignInButton";

import Button from "./UI/Button";
import dispezoLogo from "../assets/dispezo-logo.png";
import { btnStyles } from "../style";

const Auth = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const getCurrentPathHandler = () => {
    setCurrentPath(window.location.pathname);
  };

  return (
    <section className="flex flex-col items-center app-container h-full pt-7 pb-5 gap-y-7">
      <img src={dispezoLogo} alt="Dispezo PNG" className="w-2/4 md:w-56" />

      <>
        {(currentPath === "/login" || currentPath === "/") && (
          <Button
            type="submit"
            onSignIn={getCurrentPathHandler}
            styles={`${btnStyles} mt-8`}
          >
            <Link to="/signup">Create Account if you do not have one</Link>
          </Button>
        )}
       {currentPath === "/signup" || currentPath === "/login" ? "" : <h2 className='font-semibold'>Or</h2>}

        {(currentPath === "/signup" || currentPath === "/") && (
          <Button
            type="submit"
            onSignIn={getCurrentPathHandler}
            styles={`${btnStyles}`}
          >
            <Link to="/login">Login</Link>
          </Button>
        )}
      </> 

      <Outlet />
      <GoogleSignInButton />
    </section>
  );
};

export default Auth;
