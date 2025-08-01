import { Book } from "lucide-react";
import { memo } from "react";
import { useActiveTabStore } from "../../store/activeTabStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useNoteSearchTermStore } from "../../store/noteSearchTermStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

const MemoizedBook = memo(Book);

function NotebookChip({ bookIcon, notebookName, source }) {
  const { setActiveTab } = useActiveTabStore();
  const { setNotesView } = useCurrentNotesViewStore();
  const { setNoteSearchTerm } = useNoteSearchTermStore();

  function handleNotebookChipClick(e) {
    e.stopPropagation();

    if (source == APP_CONSTANTS.VIEW_NOTE_EDITOR) {
      setNotesView(APP_CONSTANTS.VIEW_GRID);
    }

    setNoteSearchTerm("book: " + notebookName);
    setActiveTab(APP_CONSTANTS.NOTES_PAGE);
  }

  return (
    <button
      className="btn bg-base-200 text-secondary flex gap-2 items-center max-w-full"
      onClick={handleNotebookChipClick}
    >
      {bookIcon ? (
        <MemoizedBook size={20} className="flex-shrink-0"></MemoizedBook>
      ) : (
        ""
      )}
      <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
        {notebookName}
      </span>
    </button>
  );
}

export default NotebookChip;
