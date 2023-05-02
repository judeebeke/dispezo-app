import { useState, useContext, useEffect } from "react";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSend } from "react-icons/bi";

import dispezoLogo from '../../assets/dispezo-logo.png'
import CartContext from "../../store/cart-context";
import { auth, db } from "../../config/firebase-config";
import { collection, addDoc, serverTimestamp, onSnapshot, query, where } from "firebase/firestore";
import Chat from "./Chat";

const ChatRoom = () => {
  const [getChat, setGetChat] = useState("");
  const [getChats, setGetChats] = useState([]);
  const {time, menuHandler, getRoomStats} = useContext(CartContext)
  
  const chatCollectionRef = collection(db, "chats");
  
  useEffect(() => {
    const sendChatCollectionRef = collection(db, "chats");
    
    const queryMessaage = query(sendChatCollectionRef, where("roomid", "==", getRoomStats.roomId));
    
    const suscribeChats =  onSnapshot(queryMessaage, (snapshot) => {
    let messages = []
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id})
      })
      setGetChats(messages)
    })


    return () => {suscribeChats()}
  }, [getRoomStats])

  const chatsInputFormHandler = async (event) => {
    event.preventDefault();
    
    if (getChat === "") {
      return;
    }

    try {    
      await addDoc(chatCollectionRef, {
        createdAt: serverTimestamp(),
        authID: auth.currentUser.uid,
        message: getChat,
        roomName: getRoomStats.roomName,
        roomid: getRoomStats.roomId,
        username: auth.currentUser.displayName || auth.currentUser.email
      })
    } catch(err) {
      console.log(err)
      window.alert("Unable to send Chats, Please try again!")
    }
   
    setGetChat("");

  };
 
  const menuHandle = () => {
        menuHandler(prev => {
            return ( !prev )
        })
      };
      
  return (
    <main className="h-full w-full md:w-4/6 flex flex-col justify-between items-start chatroom-bg">
      <nav className="flex justify-between items-start w-full px-4 pt-3 pb-1">
        {/* <div className="profile-thumbnail"></div> */}
        <span className="flex flex-col items-center w-full">
          <h1 className="font-bold text-lg">{getRoomStats.roomName.toUpperCase()}</h1>
            <p className="font-normal text-sm">{time}</p>
          </span>
        <button className="hidden md:block">
          <img src={dispezoLogo} alt="Site Logo" width="100px" height="30px"  />
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
