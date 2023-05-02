import { useContext, useState } from "react";
import useInputHook from "./customHooks/useInputHook";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

import Button from "./UI/Button";
import Input from "./UI/Input";
import { btnStyles } from "../style";
import CartContext from "../store/cart-context";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const CreateRoom = () => {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;
  const navigate = useNavigate();

  const [validateForm, setValidateForm] = useState(true);

  const {
    userInput: roomNameInput,
    userInputHandler: roomNameInputHandle,
    inputTouchHandler: roomInputTouched,
    isInputValid: isRoomNameValid,
  } = useInputHook((value) => value.trim().length > 0);

  const {
    userInput: passcodeInput,
    userInputHandler: passcodeInputHandle,
    inputTouchHandler: passcodeInputTouched,
    isInputValid: isPasscodeValid,
  } = useInputHook((value) => value.match(passw) !== null);

  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [createRoomError, setCreateRoomError] = useState(null);

  const { isLoading, loadingHandle, setGetRoomStatsHandle} =
    useContext(CartContext);

  // Reference to the collection in the DB
  const userRoomsRef = collection(db, "rooms");

  const createRoomHandler = async (event) => {
    event.preventDefault();
    loadingHandle(true);
    setCreateRoomError(null);

    if (
      !isPasscodeValid ||
      !isRoomNameValid ||
      passcodeInput !== confirmPasscode
    ) {
      setValidateForm(false);
      return;
    }

    let replacedString = roomNameInput.replace(" ", "d");
    let newReplacedString = replacedString.slice(0, 5);
    let currentStats = {
      createdAt: serverTimestamp(),
      roomId: `${newReplacedString}${auth.currentUser.uid.slice(0, 5)}`,
      roomName: roomNameInput,
      roomPasscode: passcodeInput,
      roomTrackingId: auth.currentUser.uid,
    };

      console.log(currentStats)

    try {
      await addDoc(userRoomsRef, currentStats);
      setGetRoomStatsHandle(currentStats);
      cookies.set("create-token", auth.currentUser.refreshToken);
      navigate("/chat");
      roomNameInputHandle("");
      passcodeInputHandle("");
      loadingHandle(false);
    } catch (err) {
      console.error(err);
      loadingHandle(false);
      setCreateRoomError("Failed to create room!");
    }
  };

  const passwordError = (
    <>
      {" "}
      <p className="text-sm font-semibold">
        Password must contain the following:
      </p>
      <ul className="text-xs font-medium">
        <li>First Charater must be a letter</li>
        <li>Must contain an Uppercase and a Lowercase letter</li>
        <li>Must contain a number</li>
        <li>Must contain a non-alphanumeric character</li>
        <li>Password must not be less than 7</li>
      </ul>
    </>
  );

  return (
    <form
      className="flex flex-col justify-between px-10 bg-mildWhite p-6"
      onSubmit={createRoomHandler}
    >
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
          },
        }}
      />

      {!validateForm && !isRoomNameValid && (
        <p>Please enter a valid room name!</p>
      )}

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
            passcodeInputHandle(e.target.value);
          },
        }}
      />

      {!validateForm && !isPasscodeValid && passwordError}

      <Input
        label="Confirm Room Passcode"
        inputFor="con-room-passcode"
        input={{
          id: "con-room-passcode",
          type: "password",
          name: "username",
          value: confirmPasscode,
          onChange: (e) => {
            setConfirmPasscode(e.target.value);
          },
        }}
      />

      {passcodeInput !== confirmPasscode && !validateForm && (
        <p>Please Passcode and Confirm Passcode is not the same!</p>
      )}
      {createRoomError && <p>{createRoomError}</p>}

      <Button text="Create Room" type="submit" styles={`${btnStyles} mt-8`} />
      {isLoading && validateForm && (
        <h2 className="text-main text-center mt-3">Loading...</h2>
      )}
    </form>
  );
};

export default CreateRoom;
