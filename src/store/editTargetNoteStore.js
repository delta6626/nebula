import { create } from "zustand";

export const useEditTargetNoteStore = create(function (set) {
  return {
    editTargetNote: {},
    setEditTargetNote: function (noteObject) {
      set({ editTargetNote: noteObject });
    },
  };
});
