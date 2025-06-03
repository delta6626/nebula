import { create } from "zustand";

export const useUserVerifiedStore = create(function (set) {
  return {
    userVerified: null,
    setUserVerified: function (bool) {
      set({ userVerified: bool });
    },
  };
});
