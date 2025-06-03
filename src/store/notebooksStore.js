import { create } from "zustand";

export const useNotebooksStore = create(function (set) {
  return {
    notebooks: [],
    setNotebooks: function (notebooksArray) {
      set({ notebooks: notebooksArray });
    },
  };
});
