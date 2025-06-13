import { create } from "zustand";

export const useNotesStore = create(function (set) {
  return {
    notes: [],
    setNotes: function (notesArray) {
      set({ notes: notesArray });
    },
  };
});
