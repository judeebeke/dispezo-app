import {useContext, useState} from 'react';
import useInputHook from './customHooks/useInputHook';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase-config';

import Button from "./UI/Button";
import Input from "./UI/Input";
import { btnStyles } from "../style";
import CartContext from '../store/cart-context';

const CreateRoom = () => {
  const { userInput: roomNameInput, userInputHandler: roomNameInputHandle, inputTouchHandler: roomInputTouched, isFormValid: roomNameValid } =
  useInputHook((value) => value.trim() > 0);

const { userInput: passcodeInput, userInputHandler: passcodeInputHandle, inputTouchHandler: passcodeInputTouched, isFormValid: passcodeValid } =
  useInputHook((value) => value.length > 8);

  const [confirmPasscode, setConfirmPasscode] = useState('')
  const [createRoomError, setCreateRoomError] = useState(null)

    const {setCreateRoom, getRoomName,  isLoading, loadingHandle} = useContext(CartContext)

    const userRoomsRef = collection(db, "rooms")

    const createRoomHandler = async (event) => {
      event.preventDefault()
      loadingHandle(true);
      setCreateRoomError(null)

      if (!passcodeValid && !roomNameValid && passcodeInput !== confirmPasscode) {
        loadingHandle(false);
        return;
      }
      try {
        let replacedString = roomNameInput.replace(" ", "d")

        await addDoc(userRoomsRef, {
          createdAt: serverTimestamp(),
          roomId: `${replacedString.slice(0, 5)}${auth.currentUser.uid.slice(0, 5)}`,
          roomName: roomNameInput,
          roomPasscode: passcodeInput,
          roomTrackingId: auth.currentUser.uid,
        })
      } catch(err) {
        console.error(err);
         loadingHandle(false);
         setCreateRoomError("Failed to create room!")
      }
      

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
          onBlur: roomInputTouched,
            onChange: (e) => {
              roomNameInputHandle(e.target.value);
            }
        }}
      />
      {!passcodeValid && <p>Please enter a valid room name!</p>}
      <Input
        label="Room Passcode"
        inputFor="room-passcode"
        input={{
          id: "room-passcode",
          type: "password",
          name: "username",
          onBlur: passcodeInputTouched,
          value: passcodeInput,
          onChange: (e) => {
            passcodeInputHandle(e.target.value);}
        
        }}
      />
      {!passcodeValid && <p>Please enter a valid room name!</p>}

      <Input
        label="Confirm Room Passcode"
        inputFor="con-room-passcode"
        input={{
          id: "con-room-passcode",
          type: "password",
          name: "username",
          value: confirmPasscode,
          onChange: (e) => {
            setConfirmPasscode(e.target.value);}
        }}
      />
      {passcodeInput !== confirmPasscode && <p>Please Passcode and Confirm Passcode is not the same!</p>}
        {createRoomError && <p>{createRoomError}</p>}

      <Button text="Create Room" type="submit" styles={`${btnStyles} mt-8`} />
      {isLoading && <h2 className="text-main text-center mt-3">Looding...</h2>}
    </form>
  );
};

export default CreateRoom;
