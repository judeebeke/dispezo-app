import {useContext} from 'react';
import useInputHook from './customHooks/useInputHook';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase-config';

import Button from "./UI/Button";
import Input from "./UI/Input";
import { btnStyles } from "../style";
import CartContext from '../store/cart-context';

const CreateRoom = () => {
  const { userInput: roomNameInput, userInputHandler: roomNameInputHandle } =
  useInputHook((value) => value.length > 0);
const { userInput: passcodeInput, userInputHandler: passcodeInputHandle } =
  useInputHook((value) => value.length > 8);

    const {setCreateRoom, getRoomName,  isLoading, loadingHandle} = useContext(CartContext)

    const userRoomsRef = collection(db, "rooms")

    const createRoomHandler = async (event) => {
      loadingHandle(true);
      event.preventDefault()

      if (!roomNameInput && !passcodeInput) {
        loadingHandle(false);
        return;
      }
      await addDoc(userRoomsRef, {
        createdAt: serverTimestamp(),
        roomId: `${roomNameInput}123`,
        roomName: roomNameInput,
        roomPasscode: passcodeInput,
        roomTrackingId: auth.currentUser.uid,
      })

      setCreateRoom(true)
      getRoomName(roomNameInput)
      console.log('sucessfully created room')
      roomNameInputHandle('')
      passcodeInputHandle('')
      loadingHandle(false);
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
          value: roomNameInput,
            onChange: (e) => {
              roomNameInputHandle(e.target.value);}
        }}
      />
      <Input
        label="Room Passcode"
        inputFor="room-passcode"
        input={{
          id: "room-passcode",
          type: "password",
          name: "username",
          value: passcodeInput,
          onChange: (e) => {
            passcodeInputHandle(e.target.value);}
        
        }}
      />
      <Input
        label="Confirm Room Passcode"
        inputFor="con-room-passcode"
        input={{
          id: "con-room-passcode",
          type: "password",
          name: "username",
          value: passcodeInput,
          onChange: (e) => {
            passcodeInputHandle(e.target.value);}
        }}
      />
      <Button text="Create Room" type="submit" styles={`${btnStyles} mt-8`} />
      {isLoading && <h2 className="text-main text-center mt-3">Looding...</h2>}
    </form>
  );
};

export default CreateRoom;
