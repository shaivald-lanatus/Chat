import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  LinearProgress,
  Stack,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import EmojiPicker from "emoji-picker-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "75vh",
  gap: 2,
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "100vh",
  },
}));

const MessageArea = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  maxHeight: "100%",
});

const MessageContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "16px",
});

const Message = styled(Paper)(({ isOwn }) => ({
  maxWidth: "70%",
  alignSelf: isOwn ? "flex-end" : "flex-start",
}));

const ChatUI = () => {
  const { getUsers, users } = useChatStore();
  const { authUser } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        id: Date.now(),
        fullName: selectedUser ? selectedUser.fullName : "SSS",
        profilePhoto: authUser.profilePhoto,
        message: newMessage,
        isOwn: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage("");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev + 10;
        });
      }, 300);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  return (
    <ChatContainer>
      <Paper elevation={3} sx={{ width: 280, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Friends
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => handleSelectUser(user)}
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent="SS"
                >
                  <Avatar src={user.profilePhoto} alt={user.fullName} />
                </Badge>
              </ListItemAvatar>
              <ListItemText primary={user.fullName} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {selectedUser && (
        <MessageArea>
          <Paper
            elevation={3}
            sx={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h6" sx={{ p: 2 }}>
              Chat with {selectedUser.fullName}{" "}
            </Typography>
            <MessageContainer>
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: "flex",
                    flexDirection: msg.isOwn ? "row-reverse" : "row",
                    mb: 2,
                  }}
                >
                  <Avatar
                    src={msg.profilePhoto}
                    alt={msg.fullName}
                    sx={{ mx: 1 }}
                  />
                  <Box>
                    <Message isOwn={msg.isOwn}>
                      <Typography variant="body1">{msg.message}</Typography>
                    </Message>
                    <Typography
                      variant="caption"
                      sx={{ ml: 1, color: "text.secondary" }}
                    >
                      {new Date().toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <div ref={messageEndRef} />
            </MessageContainer>

            {uploadProgress > 0 && (
              <Box sx={{ px: 2, py: 1 }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}

            <Stack
              direction="row"
              spacing={1}
              sx={{ p: 2, borderTop: 1, borderColor: "divider" }}
            >
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <Tooltip title="Attach file">
                <IconButton
                  component="label"
                  htmlFor="file-upload"
                  aria-label="attach file"
                >
                  BB
                </IconButton>
              </Tooltip>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      aria-label="emoji picker"
                    >
                      CC
                    </IconButton>
                  ),
                }}
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                aria-label="send message"
              >
                AA
              </IconButton>
            </Stack>

            {showEmojiPicker && (
              <Box sx={{ position: "absolute", bottom: "100%", right: 0 }}>
                <EmojiPicker
                  onEmojiClick={(emojiObject) =>
                    setNewMessage((prev) => prev + emojiObject.emoji)
                  }
                />
              </Box>
            )}
          </Paper>
        </MessageArea>
      )}
    </ChatContainer>
  );
};

export default ChatUI;
