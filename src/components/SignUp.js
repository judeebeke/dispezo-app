import React, { useContext } from "react";
import Button from "./UI/Button";
import CreateRoom from "./CreateRoom";
import CartContext from "../store/cart-context";
import dispezoImage from '../assets/assest-image.png';
import { btnStyles } from "../style";

const SignUp = () => {
  const { loggin, logginHandler } = useContext(CartContext);

  return (
    <section className="flex flex-col items-center mt-20 gap-y-10">
      <div className="free-design-cont">
        <img
          src={dispezoImage}
          alt="Dispezo UI"
          className="free-design"
        />
      </div>
      <header className="mb-16">
        <h2 className="text-2xl text-main font-semibold">Dispezo Gen-Z</h2>
      </header>
      {!loggin ? (
        <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
          <Button
            text="Create Room"
            onSignIn={logginHandler}
            styles={btnStyles}
          />
          <Button
            text="Join Room"
            onSignIn={logginHandler}
            styles={btnStyles}
          />
        </div>
      ) : (
        <CreateRoom />
      )}
    </section>
  );
};

export default SignUp;
