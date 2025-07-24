import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { ActivitySquare } from "lucide-react";

function UserStatistics() {
  const { notes } = useNotesStore();
  const { notebooks } = useNotebooksStore();

  let pinnedNotesCount = 0;
  let pinnedNotebooksCount = 0;
  let allTags = [];
  let uniqueTags;

  notes.forEach((note) => {
    if (note.pinned) {
      pinnedNotesCount += 1;
    }

    allTags = [...allTags, ...note.tags];
  });

  notebooks.forEach((notebook) => {
    if (notebook.pinned) {
      pinnedNotebooksCount += 1;
    }

    allTags = [...allTags, ...notebook.tags];
  });

  uniqueTags = new Set(allTags);

  return (
    <div className="bg-transparent border-1 border-accent mt-4 w-70 2xl:w-90 mx-auto rounded-lg p-4">
      <h1 className="flex items-center gap-2 font-semibold text-secondary">
        <ActivitySquare />
        Your stats
      </h1>
      <div className="mt-4 px-4">
        <ul className="list-disc">
          <li>
            {`${notebooks.length} ${
              notebooks.length == 1 ? "notebook" : "notebooks"
            } and ${notes.length} ${notes.length == 1 ? "note" : "notes"} `}
          </li>
          {/* <li className="mt-2">{`${notes.length} ${
            notes.length == 1 ? "note" : "notes"
          }`}</li> */}
          <li className="mt-2">
            {`${pinnedNotebooksCount} ${
              pinnedNotebooksCount == 1 ? "pinned notebook" : "pinned notebooks"
            } and ${pinnedNotesCount} ${
              pinnedNotesCount == 1 ? "pinned note" : "pinned notes"
            }`}
          </li>
          {/* <li className="mt-2">
            {`${pinnedNotesCount} ${
              pinnedNotesCount == 1 ? "pinned note" : "pinned notes"
            }`}
          </li> */}
          <li className="mt-2">{`${uniqueTags.size} unique ${
            uniqueTags.size == 1 ? "tag" : "tags"
          }`}</li>
        </ul>
      </div>
    </div>
  );
}

export default UserStatistics;
