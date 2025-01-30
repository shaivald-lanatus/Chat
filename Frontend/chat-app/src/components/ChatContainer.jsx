import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { messages, selectedUser, isMessageLoading, getMessages } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  if (isMessageLoading) return <div>Loading</div>;

  return (
    <>
      <div>Chat selected</div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <ChatHeader />

        <Message />

        <MessageInput />
      </div>
    </>
  );
};

export default ChatContainer;
