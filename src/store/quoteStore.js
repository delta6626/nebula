import { create } from "zustand";

export const useQuoteStore = create(function (set) {
  return {
    quotes: [],
    setQuotes: function (quotesArray) {
      set({ quotes: quotesArray });
    },
  };
});
