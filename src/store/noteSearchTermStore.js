import { create } from "zustand";

export const useNoteSearchTermStore = create(function (set) {
  return {
    noteSearchTerm: "",
    setNoteSearchTerm: function (searchTerm) {
      set({ noteSearchTerm: searchTerm });
    },
  };
});
