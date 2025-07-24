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
        className="btn w-full h-[5rem] lg:w-70 2xl:w-90 lg:h-[10rem] flex flex-col items-start lg:items-center"
        disabled={!userVerified}
        onClick={handleNewNoteClick}
      >
        <div className="flex gap-4 lg:flex-col lg:gap-0 items-center">
          <FilePlus size={30} />

          <div className="flex flex-col items-start lg:items-center">
            <p className="text-xl">New note</p>
            {user ? (
              <p className="text-secondary">{`Shift + ${user.shortcuts.NEW_NOTE}`}</p>
            ) : (
              ""
            )}
          </div>
        </div>

        {!userVerified ? (
          <div className="flex items-center gap-2 text-warning">
            <Info />
            <p>{APP_CONSTANTS.VERIFY_EMAIL}</p>
          </div>
        ) : (
          ""
        )}
      </button>

      <button
        className="btn w-full h-[5rem] lg:w-70 2xl:w-90 lg:h-[10rem] flex flex-col items-start lg:items-center"
        disabled={!userVerified}
        onClick={handleNewNotebookClick}
      >
        <div className="flex gap-4 lg:flex-col lg:gap-0 items-center">
          <BookPlus size={30} />

          <div className="flex flex-col items-start lg:items-center">
            <p className="text-xl">New notebook</p>
            {user ? (
              <p className="text-secondary">{`Shift + ${user.shortcuts.NEW_NOTE_BOOK}`}</p>
            ) : (
              ""
            )}
          </div>
        </div>

        {!userVerified ? (
          <div className="flex items-center gap-2 text-warning">
            <Info />
            <p>{APP_CONSTANTS.VERIFY_EMAIL}</p>
          </div>
        ) : (
          ""
        )}
      </button>

      <button
        className="btn w-full h-[5rem] lg:w-70 2xl:w-90 lg:h-[10rem] flex flex-col items-start lg:items-center"
        onClick={handleRecentClick}
      >
        <div className="flex gap-4 lg:flex-col lg:gap-0 items-center">
          <Clock size={30} />

          <div className="flex flex-col items-start lg:items-center">
            <p className="text-xl">Recent</p>
            {user ? (
              <p className="text-secondary">{`Shift + ${user.shortcuts.RECENT_PAGE}`}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

export default QuickActions;
