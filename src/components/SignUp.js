import React, { useContext } from "react";
import Button from "./UI/Button";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import CartContext from "../store/cart-context";
import dispezoImage from '../assets/assest-image.png';
import { btnStyles } from "../style";

const SignUp = () => {
  const { loggin, logginHandler, createsRoom, setSignUpPage } = useContext(CartContext);

  let content = '';

  const  signUpPage = <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
  <Button
    text="Create Room"
    onSignIn={()=>{setSignUpPage(true)}}
    styles={btnStyles}
  />
  <Button
    text="Join Room"
    onSignIn={()=>{logginHandler(true)}}
    styles={btnStyles}
  />
</div>

    const createRoomForm = <CreateRoom />

    const loginRoomForm = <JoinRoom />

    if(loggin) {
        content = loginRoomForm
    }

    if(createsRoom) {
        content = createRoomForm;
    }

    if(!loggin && !createsRoom) {
        content = signUpPage
    }

  return (
    <section className="flex flex-col items-center free-design-cont mt-24 gap-y-10">
        <img
          src={dispezoImage}
          alt="Dispezo UI"
          className="free-design"
        />
      <header className="mb-16">
        <h2 className="text-2xl text-main font-semibold">Dispezo Gen-Z</h2>
      </header>
      {content}
    </section>
  );
};

export default SignUp;
