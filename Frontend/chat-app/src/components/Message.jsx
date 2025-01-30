const Message = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        spaceBetween: "16px",
      }}
    >
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: idx % 2 === 0 ? "flex-start" : "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#e0e0e0",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "4px" }}>
            <div
              style={{
                height: "16px",
                width: "64px",
                backgroundColor: "#e0e0e0",
              }}
            />
          </div>

          <div style={{ padding: 0 }}>
            <div
              style={{
                height: "64px",
                width: "200px",
                backgroundColor: "#e0e0e0",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
