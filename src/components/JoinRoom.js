import { useContext, useState } from "react";
import useInputHook from "./customHooks/useInputHook";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";

import Button from "./UI/Button";
import Input from "./UI/Input";
import { btnStyles } from "../style";
import CartContext from "../store/cart-context";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const JoinRoom = () => {
  const { setGetRoomStatsHandle, setIsJoinRoom } = useContext(CartContext);
  const navigate = useNavigate();

  const [validateForm, setValidateForm] = useState(true);

//Add a validator to check if the user internet connection is active

  const {
    userInput: roomNameInput,
    userInputHandler: roomNameInputHandle,
    inputTouchHandler: roomInputTouched,
    isInputValid: isRoomNameValid,
    isInputTouched: isRoomNameTouch,
  } = useInputHook((value) => value.trim().length > 0);

  const {
    userInput: passcodeInput,
    userInputHandler: passcodeInputHandle,
    inputTouchHandler: passcodeInputTouched,
    isInputValid: isPasscodeValid,
    isInputTouched: isPasscodeTouch,
  } = useInputHook((value) => value.trim().length > 6);

  const getRoomsListColRef = collection(db, "rooms");

  const fetchRoomsDocs = async () => {
    const response = await getDocs(getRoomsListColRef);


    const getRoomInfo = response.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    console.log(getRoomInfo)

    const getRequestedChat = getRoomInfo.find((chat) => {
      console.log(chat.roomId === roomNameInput && chat.roomPasscode === passcodeInput)
      setValidateForm(chat.roomId === roomNameInput && chat.roomPasscode === passcodeInput)
      return chat.roomId === roomNameInput && chat.roomPasscode === passcodeInput
    });
    
    console.log(getRequestedChat)
    setGetRoomStatsHandle(getRequestedChat);

    if(getRequestedChat) {
      navigate("/chat");
      cookies.set("join-token", auth.currentUser.refreshToken);
      setIsJoinRoom(true)
      console.log('Do you get here?')
    }
  };

  const joinRoomHandler = async (event) => {
    event.preventDefault();

    if (!isRoomNameValid || !isPasscodeValid) {
      return;
    }

    try {
        await fetchRoomsDocs();
    } catch (err) {
      console.log(err);
      window.alert("Error while trying to join a room, Please try again!")
    }
    
    
  };

  const joinRoomError = (
    <p className="text-sm font-semibold">
      Room User Id & Password Does not match any existing room
    </p>
  );

  return (
    <form
      className="flex flex-col justify-between px-10 bg-mildWhite p-6"
      onSubmit={joinRoomHandler}
    >
      <Input
        label="Room ID"
        inputFor="room-id"
        input={{
          id: "room-id",
          type: "text",
          name: "roomid",
          value: roomNameInput,
          onChange: (e) => {
            roomNameInputHandle(e.target.value);
          },
          onBlur: roomInputTouched,
        }}
      />
      {!isRoomNameValid &&  isRoomNameTouch && <p className="mb-2">Room Id field cannot be empty</p>}

      <Input
        label="Room Passcode"
        inputFor="room-passcode"
        input={{
          id: "room-passcode",
          type: "password",
          name: "username",
          value: passcodeInput,
          onChange: (e) => {
            passcodeInputHandle(e.target.value);
          },
          onBlur: passcodeInputTouched,
        }}
      />
      {!isPasscodeValid && isPasscodeTouch && <p>Room Passcode is invalid</p>}

      {!validateForm && joinRoomError}

      <Button text="Join Room" styles={`${btnStyles} mt-8`} />
    </form>
  );
};

export default JoinRoom;
