import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";
export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessageLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message");
      set({ users: res.data });
    } catch (error) {
      toast.error("Error while loading the users");
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));
