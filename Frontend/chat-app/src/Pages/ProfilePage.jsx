import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
  width: "100%",
  margin: "0 auto",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
  border: "4px solid #3976d2",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: "10px 24px",
  fontSize: "16px",
  borderRadius: "50px",
  backgroundColor: "#3976d2",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#3976d2",
  },
}));

const ProfileTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: "12px",
  "& .MuiInputBase-root": {
    borderRadius: "12px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "12px",
    },
  },
}));

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const {
    authUser,
    isUpdating,
    updateProfile,
    updateDetails,
    isUpdatingDetails,
  } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (authUser) {
      setFullName(authUser.fullName);
      setEmail(authUser.email);
    }
  }, [authUser]);

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image is too large");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({
        profilePhoto: base64Image,
      });
    };
  };

  const handleUpdateDetails = async () => {
    try {
      await updateDetails({
        fullName,
        email,
      });
      toast.success("Details updated successfully");
    } catch (error) {
      console.log("Error updating details:", error);
      toast.error("Error updating details");
    }
  };

  return (
    <Container sx={{ padding: 4 }}>
      <ProfilePaper>
        <ProfileAvatar alt="image" src={selectedImg || authUser.profilePhoto} />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="upload-photo"
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-photo">
          <Button
            variant="outlined"
            component="span"
            sx={{
              marginTop: 2,
              borderRadius: "20px",
              padding: "6px 24px",
              backgroundColor: "#3976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#3976d2",
              },
            }}
          >
            Change Photo
          </Button>
        </label>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ marginTop: 2, fontWeight: "bold", color: "#333" }}
        >
          {authUser.fullName}
        </Typography>

        <Box my={2}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#3976d2" }}
          >
            Contact Info
          </Typography>
          <ProfileTextField
            label="Name"
            variant="outlined"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            InputProps={{
              readOnly: !isEditable,
            }}
          />
          <ProfileTextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              readOnly: !isEditable,
            }}
          />
        </Box>

        <ProfileButton
          variant="contained"
          color="primary"
          onClick={handleEdit}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : isEditable ? (
            "Done with editing"
          ) : (
            "Update Profile"
          )}
        </ProfileButton>
        <ProfileButton onClick={handleUpdateDetails}>
          Update Details
        </ProfileButton>
      </ProfilePaper>
    </Container>
  );
};

export default ProfilePage;
