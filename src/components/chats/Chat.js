import React from 'react';
import { auth } from '../../config/firebase-config';

const Chat = ({chats}) => {
  return (
    <>
    {chats.map((chat) => {
    console.log(chat, chat.authID, auth.currentUser.uid)
        return (
          <p
            className={`flex flex-col py-2 px-2 mb-2 bg-main w-max border-0 rounded-xl chats ${chat.authID === auth.currentUser.uid && "user"}`}
            key={chat.id}
          >
            <i className="text-gray-100 text-xs">{chat.username}</i>
            {chat.message}
            {/* <em  className="pt-4 pl-2 ">{time}</em> */}
          </p>
        );
      })
    }
    </>
  )
}

export default Chat
