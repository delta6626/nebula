import { Plus, TagIcon, Trash2 } from "lucide-react";
import { useActiveTabStore } from "../../store/activeTabStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNoteSearchTermStore } from "../../store/noteSearchTermStore";
import { useNotebookSearchTermStore } from "../../store/notebookSearchTermStore";

function Tag({
  id,
  tagText,
  moreTag,
  showTagIcon,
  showDeleteIcon,
  darkBackground,
  onDeleteClick,
  source,
}) {
  const { activeTab, setActiveTab } = useActiveTabStore();
  const { noteSearchTerm, setNoteSearchTerm } = useNoteSearchTermStore();
  const { notebookSearchTerm, setNotebookSearchTerm } =
    useNotebookSearchTermStore();

  function handleTagDelete() {
    onDeleteClick(id);
  }

  function handleTagClick(e) {
    e.stopPropagation();

    if (showDeleteIcon || moreTag) {
      return;
    }

    if (source == APP_CONSTANTS.SOURCE_NOTE) {
      setActiveTab(APP_CONSTANTS.NOTES_PAGE);
      if (noteSearchTerm == "" || !noteSearchTerm.startsWith("tag:")) {
        setNoteSearchTerm("tag: " + tagText);
      } else {
        setNoteSearchTerm(noteSearchTerm + " " + tagText);
      }
    } else if (source == APP_CONSTANTS.SOURCE_NOTEBOOK) {
      setActiveTab(APP_CONSTANTS.NOTEBOOKS_PAGE);
      if (notebookSearchTerm == "" || !notebookSearchTerm.startsWith("tag:")) {
        setNotebookSearchTerm("tag: " + tagText);
      } else {
        setNotebookSearchTerm(notebookSearchTerm + " " + tagText);
      }
    }
  }

  return (
    <div
      className={
        (darkBackground ? "bg-base-200 " : "bg-base-200 ") +
        "btn rounded-lg flex text-secondary items-center gap-2 px-4 py-2 max-w-[200px] cursor-pointer"
      }
      title={tagText}
      onClick={handleTagClick}
    >
      {!moreTag && showTagIcon ? (
        <TagIcon size={20} className="shrink-0" />
      ) : moreTag ? (
        <Plus size={20}></Plus>
      ) : (
        ""
      )}
      <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis">
        {tagText.length > 10 ? tagText.slice(0, 10) + ".." : tagText}
      </span>
      {showDeleteIcon ? (
        <Trash2
          size={20}
          className="text-error cursor-pointer"
          onClick={handleTagDelete}
        ></Trash2>
      ) : (
        ""
      )}
    </div>
  );
}

export default Tag;
