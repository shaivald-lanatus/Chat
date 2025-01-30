import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const onlineUsers = ["aa"];
  console.log("aa", selectedUser);

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              position: "relative",
            }}
          >
            <img
              src={selectedUser.profilePhoto || "/avatar.png"}
              alt={selectedUser.fullName}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "10px",
            }}
          >
            <h3 style={{ fontWeight: "500" }}>{selectedUser.fullName}</h3>
            <p style={{ fontSize: "12px", color: "#757575" }}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
