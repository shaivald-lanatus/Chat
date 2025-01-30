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

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Error while getting messages");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
  sendMessages: async (data) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/send/${selectedUser._id}`, data);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error("Error while sending the message");
    }
  },
}));
