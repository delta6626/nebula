import { create } from "zustand";
import { APP_CONSTANTS } from "../constants/APP_CONSTANTS";

export const useActiveTabStore = create(function (set) {
  return {
    activeTab: APP_CONSTANTS.DASHBOARD_PAGE,
    setActiveTab: function (tabName) {
      set({ activeTab: tabName });
    },
  };
});
