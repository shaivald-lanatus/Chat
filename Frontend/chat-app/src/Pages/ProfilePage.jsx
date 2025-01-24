import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { TextField } from "@mui/material";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  return (
    <>
      <div>Profile Page</div>

      <div>{authUser.email}</div>
    </>
  );
};

export default ProfilePage;
