import React from 'react';
import { auth } from '../../config/firebase-config';

const Chat = ({chats}) => {
  return (
    <>
    {chats.map((chat) => {
        return (
          <p
            className={`relative flex flex-col flex-wrap py-2 px-2 mb-2 bg-main w-max border-0 rounded-xl chats ${chat.authID === auth.currentUser.uid && "user"}`}
            key={chat.id}
          >
            <i className="text-gray-100 text-[0.55rem]">{chat.username}</i>
            {chat.message}
            <em  className="absolute bottom-1 right-2 text-[0.5rem] pt-2 ">{chat.chatTime}</em>
          </p>
        );
      })
    }
    </>
  )
}

export default Chat
