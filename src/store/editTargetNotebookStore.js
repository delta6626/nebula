import { create } from "zustand";

export const useEditTargetNotebookStore = create(function (set) {
  return {
    editTargetNotebook: {},
    setEditTargetNotebook: function (notebookObject) {
      set({ editTargetNotebook: notebookObject });
    },
  };
});
