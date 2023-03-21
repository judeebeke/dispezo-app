import {useContext} from 'react'
import Button from "./UI/Button";
import Input from "./UI/Input";
import { btnStyles } from "../style";
import CartContext from '../store/cart-context';

const JoinRoom = () => {
    const {setJoinRoom} = useContext(CartContext)

    const joinRoomHandler = (event) => {
      event.preventDefault()

      setJoinRoom(true)
    }

  return (
    <form className="flex flex-col justify-between px-10 bg-mildWhite p-6"  onSubmit={joinRoomHandler}>
       
      <Input
        label="Room ID"
        inputFor="room-id"
        input={{
          id: "room-id",
          type: "text",
          name: "roomid",
        }}
      />
      <Input
        label="Room Passcode"
        inputFor="room-passcode"
        input={{
          id: "room-passcode",
          type: "password",
          name: "username",
        }}
      />
      <Button text="Join Room" styles={`${btnStyles} mt-8`} />
    </form>
  );
};

export default JoinRoom;
