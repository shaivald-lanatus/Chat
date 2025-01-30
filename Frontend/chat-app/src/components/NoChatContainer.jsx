import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <div style={{ maxWidth: "28rem", textAlign: "center", spaceY: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "1rem",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "bounce 1s infinite",
              }}
            >
              <MessageSquare
                style={{ width: "2rem", height: "2rem", color: "#3B82F6" }}
              />
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>
          Welcome to Chat!
        </h2>
        <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
