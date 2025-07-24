import { create } from "zustand";

export const useDashboardHamburgerStore = create(function (set) {
  return {
    dashboardHamburgerOpen: false,
    setDashboardHamburgerOpen: function (state) {
      set({ dashboardHamburgerOpen: state });
    },
  };
});
