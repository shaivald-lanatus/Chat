import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogging: false,
  isUpdating: false,
  isUpdatingDetails: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkData");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created");
    } catch (error) {
      toast.error("Error");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Loggen in successfully ");

      set({ authUser: res.data });
    } catch (error) {
      toast.error("Error while logging in");
    } finally {
      set({ isLogging: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successful");
    } catch (error) {
      toast.error("Error while logging in");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdating: true });

    try {
      const res = await axiosInstance.put("/auth/update", data);
      set({ authUser: res.data });
      console.log("aaa");
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Error while updating the profile");
      console.log("aaavv");
    } finally {
      set({ isUpdating: false });
    }
  },

  updateDetails: async (data) => {
    set({ isUpdatingDetails: true });
    try {
      const res = await axiosInstance.put("/auth/updateDetails", data);
      set({ authUser: res.data });
      toast.success("Profile details updated successfulss");
    } catch (error) {
      toast.error("Error faced while updating the profile details");
    } finally {
      set({ isUpdatingDetails: false });
    }
  },
}));
