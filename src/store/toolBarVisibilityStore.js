import { create } from "zustand";

export const useToolBarVisibilityStore = create(function (set) {
  return {
    toolBarVisible: true,
    setToolBarVisible: function (newVisibilityStatus) {
      set({ toolBarVisible: newVisibilityStatus });
    },
  };
});
