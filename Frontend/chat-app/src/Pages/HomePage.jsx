import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";
import NoChatContainer from "../components/NoChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div
      style={{
        height: "100vh",
        // backgroundColor: "blue",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "5rem",
          paddingX: "1rem",
        }}
      >
        <div
          style={{
            // backgroundColor: "red",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            height: "calc(100vh - 8rem)",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "100%",
              borderRadius: "0.375rem",
              overflow: "hidden",
            }}
          >
            <Sidebar />
            {!selectedUser ? <NoChatContainer /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
