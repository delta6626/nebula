import { create } from "zustand";

export const useNotebookSearchTermStore = create(function (set) {
  return {
    notebookSearchTerm: "",
    setNotebookSearchTerm: function (searchTerm) {
      set({ notebookSearchTerm: searchTerm });
    },
  };
});
