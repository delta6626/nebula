// store/messageStore.js
import { create } from "zustand";

export const useMessageStore = create(function (set) {
  return {
    message: {
      title: "",
      textContent: "",
      firstButtonText: "",
      secondButtonText: "",
      firstButtonClassName: "btn",
      secondButtonClassName: "btn hidden",
      firstButtonOnClick: null,
      secondButtonOnClick: null,
    },
    setMessage: function (messageObject) {
      set({ message: messageObject });
    },
  };
});
