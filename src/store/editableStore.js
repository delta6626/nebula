import { create } from "zustand";

export const useEditableStore = create(function (set) {
  return {
    editable: true,
    setEditable: function (state) {
      set({ editable: state });
    },
  };
});
