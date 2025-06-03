import { create } from "zustand";
import { APP_CONSTANTS } from "../constants/APP_CONSTANTS";

export const useCurrentNotesViewStore = create(function (set) {
  return {
    notesView: APP_CONSTANTS.VIEW_GRID, // Default view
    setNotesView: (viewType) => {
      set({ notesView: viewType });
    },
  };
});
