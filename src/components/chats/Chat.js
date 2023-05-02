import React from 'react';
import { auth } from '../../config/firebase-config';

const Chat = ({chats}) => {
  return (
    <>
    {chats.map((chat) => {
        return (
          <p
            className={`flex flex-col py-2 px-2 mb-2 bg-main items-end w-max user border-0 rounded-xl chats ${chat.authId === auth.currentUser.uid && "user"}`}
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
