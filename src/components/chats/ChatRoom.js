import { useState, useContext } from "react";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSend } from "react-icons/bi";
import dispezoLogo from '../../assets/dispezo-logo.png'
import CartContext from "../../store/cart-context";

const ChatRoom = () => {
   const [getChat, setGetChat] = useState("");
  const [getChats, setGetChats] = useState([]);
  const {time, createRoom, joinRoom, isMenu, menuHandler} = useContext(CartContext)

  const chatsInputHandler = (event) => {
    setGetChat(event.target.value);
  };

  const chatsInputFormHandler = (event) => {
    event.preventDefault();

    if (getChat === "") {
      return;
    } else {
      setGetChats((prev) => {
        return [...prev, { message: getChat, id: Math.random().toFixed(3) }];
      });

      setGetChat("");

      console.log(createRoom, joinRoom, isMenu);
    }
  };
 
  let chatsContent = getChats.map((chat) => {
    return (
      <p
        className="py-2 px-2 mb-2 bg-main items-end w-max user border-0 rounded-xl"
        key={chat.id}
      >
        {chat.message}
      </p>
    );
  });

  const menuHandle = () => {
        menuHandler(prev => {
            return ( !prev )
        })
      };

  return (
    <main className="h-full w-full md:w-4/6 flex flex-col justify-between items-start chatroom-bg">
      <nav className="flex justify-between items-start w-full px-4 pt-3 pb-1">
        <div className="profile-thumbnail">{/* <img src='' alt='' /> */}</div>
        <span className="flex flex-col items-center w-full">
          <h1 className="font-bold text-lg">Room Name</h1>
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
        <p className="py-2 shadow-md mb-2 bg-main px-2 w-max border-0 rounded-xl">
          Hi Ebeke
        </p>
        <p className="py-2 shadow-md px-2 mb-2 bg-main w-max border-0 rounded-xl">
          Hi i'm Jude, I am here to help you connect privately
        </p>
        <p className="py-2 shadow-md px-2 mb-2 bg-main items-end w-max user border-0 rounded-xl">
          Hi Jude
        </p>
        <p className="py-2 shadow-md px-2 mb-2 bg-main items-end w-max user border-0 rounded-xl">
          This is just a dummy chat
        </p>
        <p className="py-2 shadow-md mb-2 bg-main px-2 w-max border-0 rounded-xl">
          Hi Ebeke
        </p>
        <p className="py-2 shadow-md px-2 mb-2 bg-main w-max border-0 rounded-xl">
          Hi i'm Jude, I am here to help you connect privately
        </p>
        {chatsContent}
      </div>
      <form
        className="w-full h-10 flex justify-start shadow-md chat-form"
        onSubmit={chatsInputFormHandler}
      >
        <input
          type="text"
          name="chat-input"
          onChange={chatsInputHandler}
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
