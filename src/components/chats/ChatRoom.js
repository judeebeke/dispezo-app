import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import { btnStyles } from "../../style";
import { BiSend } from 'react-icons/bi'

const ChatRoom = () => {
  const { logginHandler, setCreateRoom, setJoinRoom, setSignUpPage } =
    useContext(CartContext);
   const [getChat, setGetChat] = useState('');
   const [getChats, setGetChats] = useState([]);

    const chatsInputHandler = (event) => {
          setGetChat(event.target.value)
    }

    const chatsInputFormHandler = (event) => {
        event.preventDefault()

        if(getChat === '') {
          return;
        } else {
          setGetChats(prev => {
            // if()
            return [...prev, {message: getChat, id: Math.random().toFixed(3)}]
        })

        setGetChat('')
        }       
    }

  const logOutHandler = () => {
    setCreateRoom(false);
    logginHandler(false);
    setJoinRoom(false);
    setSignUpPage(false);
  };

  let chatsContent = getChats.map(chat => {
    return (
        <p className="py-2 px-2 mb-2 bg-main items-end w-max user border-0 rounded-xl" id={chat.id}>
      {chat.message}
    </p>
    )
})

  return (
    <main className="h-full w-full md:w-4/6 flex flex-col justify-between items-start chatroom-bg">
      <nav className="flex justify-between items-center w-full px-4 pt-3 pb-2">
        <div className="profile-thumbnail">{/* <img src='' alt='' /> */}</div>
        <Button styles={btnStyles} text="Logout" onSignIn={logOutHandler} />
      </nav>
      <div className="flex flex-col justify-start w-full h-4/5 text-mildWhite px-4 mt-2 mb-2 overflow-y-auto chats-view">
        <p className="py-2 shadow-md mb-2 bg-main px-2 w-max border-0 rounded-xl">Hi Ebeke</p>
        <p className="py-2 shadow-md px-2 mb-2 bg-main w-max border-0 rounded-xl">
          Hi i'm Jude, I am here to help you connect privately
        </p>
        <p className="py-2 shadow-md px-2 mb-2 bg-main items-end w-max user border-0 rounded-xl">Hi Jude</p>
        <p className="py-2 shadow-md px-2 mb-2 bg-main items-end w-max user border-0 rounded-xl">
          This is just a dummy chat
        </p>
        <p className="py-2 shadow-md mb-2 bg-main px-2 w-max border-0 rounded-xl">Hi Ebeke</p>
        <p className="py-2 shadow-md px-2 mb-2 bg-main w-max border-0 rounded-xl">
          Hi i'm Jude, I am here to help you connect privately
        </p>
        {chatsContent}
      </div>
      <form className="w-full h-10 flex justify-start shadow-md chat-form" onSubmit={chatsInputFormHandler}>
      <input
          type="text"
          name="chat-input"
          onChange={chatsInputHandler}
          placeholder='Type your message here...'
          className="w-full h-10 bg-mildWhite focus:outline-none px-4"
          value={getChat}
      />
      <div className='w-6 h-10 bg-mildWhite chats-btn-cont'>
          <button type="submit" className="chats-btn"><BiSend /></button>
      </div>
      </form>
    </main>
  );
};

export default ChatRoom;
