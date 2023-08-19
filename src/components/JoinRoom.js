import {  useState } from "react";
import {useDispatch} from "react-redux"
import useInputHook from "./customHooks/useInputHook";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase-config";

import Button from "./UI/Button";
import Input from "./UI/Input";
import { btnStyles } from "../style";
import { useNavigate, Form } from "react-router-dom";
import { uiActions } from "../store/ui-slice";

const JoinRoom = () => {
  const navigate = useNavigate();
  const [ loadingHandle, setLoadingHandle] = useState(false);
  const [validateForm, setValidateForm] = useState(true);
  const dispatch = useDispatch();

// Note: Add a validator to check if the user internet connection is active

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


    const getRequestedChat = getRoomInfo.find((chat) => {
      setValidateForm(chat.roomId === roomNameInput && chat.roomPasscode === passcodeInput)
      return chat.roomId === roomNameInput && chat.roomPasscode === passcodeInput;
    });
      
      if(getRequestedChat) {
        let requestedRoomStats = {
          roomId: getRequestedChat.roomId,
          roomName: getRequestedChat.roomName,
          roomPasscode: getRequestedChat.roomPasscode,
          roomTrackingId: getRequestedChat.roomTrackingId,
        } 

      dispatch(uiActions.getEnteredRoom({enteredRoomStats: requestedRoomStats}))

      navigate("/chat");
      // cookies.set("join-token", auth.currentUser.refreshToken);
      setLoadingHandle(false)
    }

  };

  const joinRoomHandler = (event) => {
    event.preventDefault();
    setLoadingHandle(true)
    setValidateForm(true);

    if (!isRoomNameValid || !isPasscodeValid) {
      return;
    }

    try {
       fetchRoomsDocs();
    } catch (err) {
      console.log(err.code);
      window.alert(err.code)
    }
    
  };

  const joinRoomError = (
    <p className="text-sm font-semibold">
      Room User Id & Password Does not match any existing room
    </p>
  );

  return (
    <Form
    method='post'
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
      { loadingHandle &&  (
        <h2 className="text-main text-center mt-3">Loading...</h2>
      )}
    </Form>
  );
};

export default JoinRoom;

// export const action = async({request, params}) => {
//   const getRoomsListColRef = collection(db, "rooms");

//   const response = await getDocs(getRoomsListColRef);


//     const getRoomInfo = response.docs.map((doc) => {
//       return { ...doc.data(), id: doc.id };
//     });
// }
