import { create } from "zustand";

export const useThemeStore = create(function (set) {
  return {
    theme: "dark",
    setTheme: function (newTheme) {
      set({ theme: newTheme });
    },
  };
});
