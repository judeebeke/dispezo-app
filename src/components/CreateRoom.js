import {useContext} from 'react'
import Button from "./UI/Button";
import Input from "./UI/Input";
import { btnStyles } from "../style";
import CartContext from '../store/cart-context';

const CreateRoom = () => {
    const {setCreateRoom} = useContext(CartContext)

    const createRoomHandler = (event) => {
      event.preventDefault()

      setCreateRoom(prev => !prev)
    }

  return (
    <form className="flex flex-col justify-between px-10 bg-mildWhite p-6"  onSubmit={createRoomHandler}>
       
      <Input
        label="Room Name"
        inputFor="room-name"
        input={{
          id: "room-name",
          type: "text",
          name: "username",
        }}
      />
      <Input
        label="Room Passcode"
        inputFor="room-passcode"
        input={{
          id: "room-passcode",
          type: "text",
          name: "username",
        }}
      />
      <Input
        label="Confirm Room Passcode"
        inputFor="con-room-passcode"
        input={{
          id: "con-room-passcode",
          type: "text",
          name: "username",
        }}
      />
      <Button text="Create Room" styles={`${btnStyles} mt-8`} />
    </form>
  );
};

export default CreateRoom;
