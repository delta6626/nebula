import { BookPlus, Clock, FilePlus, Info } from "lucide-react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useActiveTabStore } from "../../store/activeTabStore";
import { useUserStore } from "../../store/userStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
function QuickActions() {
  const { setActiveTab } = useActiveTabStore();
  const { userVerified } = useUserVerifiedStore();
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
    <div className="min-w-fit flex md:flex-col lg:flex-row flex-wrap gap-5 mt-4">
      <button
        className="btn w-full lg:w-70 2xl:w-90 md:h-20 lg:h-[10rem] flex flex-col"
        disabled={!userVerified}
        onClick={handleNewNoteClick}
      >
        <FilePlus size={30} />
        <p className="text-xl">New note</p>
        <div className="flex flex-row items-center text-secondary">
          {user ? `Shift + ${user.shortcuts.NEW_NOTE}` : ""}
        </div>

        {userVerified ? (
          <div className="flex items-center gap-2 text-warning">
            <Info />
            <p>{APP_CONSTANTS.VERIFY_EMAIL}</p>
          </div>
        ) : (
          ""
        )}
      </button>

      <button
        className="btn w-full lg:w-70 2xl:w-90 md:h-20 lg:h-[10rem] flex flex-col"
        disabled={!userVerified}
        onClick={handleNewNotebookClick}
      >
        <BookPlus size={30} />
        <p className="text-xl">New notebook</p>
        <div className="flex flex-row items-center text-secondary">
          {user ? `Shift + ${user.shortcuts.NEW_NOTE_BOOK}` : ""}
        </div>
        {userVerified ? (
          <div className="flex items-center gap-2 text-warning">
            <Info />
            <p>{APP_CONSTANTS.VERIFY_EMAIL}</p>
          </div>
        ) : (
          ""
        )}
      </button>

      <button
        className="btn w-full lg:w-70 2xl:w-90 md:h-20 lg:h-[10rem] flex flex-col"
        onClick={handleRecentClick}
      >
        <Clock size={30} />
        <p className="text-xl">Recent</p>
        <div className="flex flex-row items-center text-secondary">
          {user ? `Shift + ${user.shortcuts.RECENT_PAGE}` : ""}
        </div>
      </button>
    </div>
  );
}

export default QuickActions;
