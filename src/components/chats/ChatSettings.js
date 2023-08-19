import React, { useState } from "react";
import { btnStyles } from "../../style";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { db } from "../../config/firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ChatSettings = () => {
  const [showRoomData, setShowRoomData] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [onDeleteChat, setOnDeleteChat] = useState(false);
  const [onDeleteChatError, setOnDeleteChatError] = useState(false);
  const roomStats = useSelector((state) => state.ui.currentRoom);
  const sendChatCollectionRef = collection(db, "chats");

  const deleteAllChatsHandler = async () => {
    try {
      const querySnapshot = await getDocs(
        query(sendChatCollectionRef, where("roomid", "==", roomStats.roomId))
      );

      const deleteDocumentRecursive = async (index) => {
        if (index < querySnapshot.size) {
          const docSnapshot = querySnapshot.docs[index];
          const documentRef = doc(db, "chats", docSnapshot.id);

          await deleteDoc(documentRef);

          // Delete the next document recursively
          await deleteDocumentRecursive(index + 1);
        }
      };

      await deleteDocumentRecursive(0);

      setOnDeleteChat(true);
      setTimeout(() => {
        setOnDeleteChat(false);
      }, 1500);
    } catch (error) {
      setOnDeleteChatError(error.code);
    }
  };

  const handleCopyClick = () => {
    const textarea = document.querySelector("#roomData");
    const textToCopy = textarea.value;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    });
  };

  return (
    <section className="relative flex flex-col justify-start items-center w-screen h-screen gap-y-3 py-10 app-container">
      <Link
        to="/chat"
        className="text-xl flex justify-center items-center text-mildWhite bg-main rounded-lg h-9 w-7 absolute top-10 left-7"
      >
        <AiOutlineArrowLeft />
      </Link>
      <h4 className="text-2xl text-lightMain text-center mb-5">
        {roomStats.roomName.toUpperCase()}
      </h4>
      <Button
        styles={btnStyles}
        text="Delete All Chats"
        onSignIn={deleteAllChatsHandler}
      />
      {onDeleteChat && (
        <p className="text-mildWhite bg-main mt-4 w-auto py-3 animate-bounce duration-300 ease-linear rounded-md">
          Successfully Deleted All Chats on {roomStats.roomName}
        </p>
      )}
      {onDeleteChatError && (
        <p className="text-mildWhite bg-main mt-4 w-auto py-3 animate-bounce duration-300 ease-linear rounded-md">
          {onDeleteChatError}
        </p>
      )}

      <div className="mt-5 font-semibold text-sm w-[15rem] h-[5rem]">
        <span className="w-full flex flex-row flex-nowrap justify-between items-center mb-4">
          <p className="text-md text-main">Display Room Id & Passcode</p>
          {!showRoomData ? (
            <i
              className="text-xl text-main"
              onClick={() => {
                setShowRoomData((prev) => !prev);
              }}
            >
              <AiFillEye />
            </i>
          ) : (
            <i
              className="text-xl text-main"
              onClick={() => {
                setShowRoomData((prev) => !prev);
              }}
            >
              <AiFillEyeInvisible />
            </i>
          )}
        </span>

        {showRoomData && (
          <div className="relative w-full h-full">
            <i
              className="absolute flex justify-center items-center -top-2 -right-2 bg-lightMain text-mildWhite rounded-3xl text-center w-8 h-6 text-xs cursor-pointer"
              onClick={handleCopyClick}
            >
              copy
            </i>
            {isCopied && (
              <p className="absolute flex justify-center items-center top-0 right-[4.5rem] bg-lightMain text-mildWhite text-center w-[3rem] h-8 text-xs cursor-pointer px-3 animate-bounce duration-300 ease-linear rounded-md">
                Copied
              </p>
            )}
            <textarea
              name="room-details"
              id="roomData"
              readOnly
              className="p-5 w-full h-auto border border-main shadow-md outline-lightMain transition-opacity duration-300 ease-in focus:border-lightMain"
              rows={2}
              value={`Room Id: ${roomStats.roomId}\nRoom Passcode: ${roomStats.roomPasscode}`}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatSettings;
