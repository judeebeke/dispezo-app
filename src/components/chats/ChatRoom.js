import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSend } from "react-icons/bi";

import dispezoLogo from "../../assets/dispezo-logo.png";
import { auth, db } from "../../config/firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy
} from "firebase/firestore";
import Chat from "./Chat";
import { uiActions } from "../../store/ui-slice";

const ChatRoom = () => {
  const [theCurrentTime, setTheCurrentTime] = useState("");
  const [getChat, setGetChat] = useState("");
  const [getChats, setGetChats] = useState([]);
  const [userInitial, setUserInitial] = useState("U");
  const enteredRoomStats = useSelector((state) => state.ui.currentRoom);
  const dispatch = useDispatch();

  const chatCollectionRef = collection(db, "chats");

  useEffect(() => {
    setUserInitial(auth.currentUser.email.slice(0, 1));
    const sendChatCollectionRef = collection(db, "chats");

    const queryMessaage = query(
      sendChatCollectionRef,
      where("roomid", "==", enteredRoomStats.roomId),
      orderBy("createdAt")
    );

    const unSuscribeChats = onSnapshot(queryMessaage, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setGetChats(messages);
    });

    return () => {
      unSuscribeChats();
    };
  }, [enteredRoomStats]);

  const chatsInputFormHandler = async (event) => {
    event.preventDefault();

    if (getChat === "") {
      return;
    }
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    let formattedHr = hours < 10 ? `0${hours}` : hours;
    let formattedMin = minutes < 10 ? `0${minutes}` : minutes;

    let setCurrentChatTime = `${formattedHr}:${formattedMin}`;

    try {
      await addDoc(chatCollectionRef, {
        createdAt: serverTimestamp(),
        chatTime: setCurrentChatTime,
        authID: auth.currentUser.uid,
        message: getChat,
        roomName: enteredRoomStats.roomName,
        roomid: enteredRoomStats.roomId,
        username: auth.currentUser.displayName || auth.currentUser.email,
      });
    } catch (err) {
      console.log(err.code);
      window.alert("Unable to send Chats, Please try again!");
    }

    setGetChat("");
  };

  const menuHandle = () => {
    dispatch(uiActions.setMenuOpen());
  };

  const getCurrentTime = useCallback(() => {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    let formattedHr = hours < 10 ? `0${hours}` : hours;
    let formattedMin = minutes < 10 ? `0${minutes}` : minutes;

    let time = `${formattedHr}:${formattedMin}`;
    setTheCurrentTime(time);
  }, []);

  useEffect(() => {
    getCurrentTime();

    // Update time every minute
    const interval = setInterval(() => {
      getCurrentTime();
    }, 60000);

    // Clean up interval
    return () => {
      clearInterval(interval);
    };
  }, [getCurrentTime]);

  return (
    <main className="h-full w-full md:w-4/6 flex flex-col justify-between items-start chatroom-bg">
      <nav className="flex justify-between items-start w-full px-4 pt-3 pb-1">
        {!auth.currentUser.photoURL ? (
          <div className="w-9 h-8 rounded-full text-mildWhite bg-main text-center flex justify-center items-center">
            {userInitial.toUpperCase()}
          </div>
        ) : (
          <img
            src={auth.currentUser.photoURL}
            className="w-8 h-8 rounded-full object-contain font-bold"
            alt="Current User Display"
          />
        )}
        <span className="flex flex-col items-center w-full">
          <h1 className="font-bold text-lg">{enteredRoomStats.roomName}</h1>
          <p className="font-normal text-sm">{theCurrentTime}</p>
        </span>
        <button className="hidden md:block">
          <img src={dispezoLogo} alt="Site Logo" width="100px" height="30px" />
        </button>
        <button className="md:hidden" onClick={menuHandle}>
          <IconContext.Provider value={{ className: "menu-icon" }}>
            <GiHamburgerMenu />
          </IconContext.Provider>
        </button>
      </nav>
      <div className="flex flex-col justify-start w-full h-4/5 text-mildWhite px-4 mt-2 mb-2 overflow-y-auto chats-view">
        <Chat chats={getChats} />
      </div>
      <form
        className="w-full h-10 flex justify-start shadow-md"
        onSubmit={chatsInputFormHandler}
      >
        <input
          type="text"
          name="chat-input"
          x-webkit-speech="true"
          onChange={(event) => setGetChat(event.target.value)}
          placeholder="Type your message here..."
          className="w-full h-10 bg-mildWhite focus:outline-none px-4"
          value={getChat}
        />
        <div className="w-6 h-10 bg-mildWhite chats-btn-cont">
          <button type="submit" className="chats-btn">
            <BiSend />
          </button>
        </div>
      </form>
    </main>
  );
};

export default ChatRoom;
