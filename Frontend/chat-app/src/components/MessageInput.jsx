import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessages } = useChatStore();
  // useEffect(() => {
  //   sendMessages();
  // }, [sendMessages]);

  return <div>Write Message</div>;
};

export default MessageInput;
