import { ArrowBigUp, BookPlus, Clock, FilePlus, Plus } from "lucide-react";
import { useActiveTabStore } from "../../store/activeTabStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import { useUserStore } from "../../store/userStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
function QuickActions() {
  const { activeTab, setActiveTab } = useActiveTabStore();
  const { userVerified, setUserVerified } = useUserVerifiedStore();
  const { user } = useUserStore();

  function handleNewNoteClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).showModal();
  }

  function handleNewNotebookClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).showModal();
  }

  function handleRecentClick() {
    setActiveTab(APP_CONSTANTS.RECENT_ITEMS);
  }

  return (
    <div className="min-w-fit flex flex-wrap gap-5 mt-4">
      <div
        className={!userVerified ? "tooltip tooltip-bottom" : ""}
        data-tip={APP_CONSTANTS.VERIFY_EMAIL}
      >
        <button
          className="btn w-sm h-[10rem] flex flex-col"
          disabled={!userVerified}
          onClick={handleNewNoteClick}
        >
          <FilePlus size={30} />
          <p className="text-xl">New note</p>
          <div className="flex flex-row items-center text-gray-400">
            {user ? `Shift + ${user.shortcuts.NEW_NOTE}` : ""}
          </div>
        </button>
      </div>

      <div
        className={!userVerified ? "tooltip tooltip-bottom" : ""}
        data-tip={APP_CONSTANTS.VERIFY_EMAIL}
      >
        <button
          className="btn w-sm h-[10rem] flex flex-col"
          disabled={!userVerified}
          onClick={handleNewNotebookClick}
        >
          <BookPlus size={30} />
          <p className="text-xl">New notebook</p>
          <div className="flex flex-row items-center text-gray-400">
            {user ? `Shift + ${user.shortcuts.NEW_NOTE_BOOK}` : ""}
          </div>
        </button>
      </div>

      <button
        className="btn w-sm h-[10rem] flex flex-col"
        onClick={handleRecentClick}
      >
        <Clock size={30} />
        <p className="text-xl">Recent</p>
        <div className="flex flex-row items-center text-gray-400">
          {user ? `Shift + ${user.shortcuts.RECENT_PAGE}` : ""}
        </div>
      </button>
    </div>
  );
}

export default QuickActions;
