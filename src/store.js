import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  users: [],
  setUser: (user) => set({ user }),
  setUsers: (users) => set({ users }),
}));

export default useStore;
