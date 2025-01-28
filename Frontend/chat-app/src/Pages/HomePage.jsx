import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatUI from "../components/ChatUI";

const HomePage = () => {
  const { getUsers, users } = useChatStore();
  console.log("Users:", users);

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <ChatUI />
      </div>
    </>
  );
};

export default HomePage;
