import { create } from "zustand";

export const useUserStore = create(function (set) {
  return {
    user: null,
    setUser: function (userObject) {
      set({ user: userObject });
    },
  };
});
