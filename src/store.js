import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  users: [],
  messages: [],
  setUser: (user) => set({ user }),
  setUsers: (users) => set({ users }),
  setMessages: (messages) => set({ messages }),
}));

export default useStore;
