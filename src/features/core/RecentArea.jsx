import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useState } from "react";
import { Search, LayoutGrid, Table } from "lucide-react";
import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useUserStore } from "../../store/userStore";
import { objectToDate } from "../../utils/objectToDate";
import GridNote from "../components/GridNote";
import GridNotebook from "../components/GridNotebook";
import TableNote from "../components/TableNote";
import TableNotebook from "../components/TableNotebook";
import NoteEditor from "../components/NoteEditor";
import ViewSwitcher from "../components/ViewSwitcher";

function RecentArea() {
  const { notesView, setNotesView } = useCurrentNotesViewStore();
  const { notes } = useNotesStore();
  const { notebooks } = useNotebooksStore();
  const { user } = useUserStore();

  const timeRangeOptions = [
    { label: "Last hour", value: 60 * 60 * 1000 }, // 1 hour
    { label: "Last 24 hours", value: 24 * 60 * 60 * 1000 }, // 1 day
    { label: "Last 7 days", value: 7 * 24 * 60 * 60 * 1000 }, // 1 week
    { label: "Last month", value: 30 * 24 * 60 * 60 * 1000 }, // 1 month (30 days)
    { label: "Last year", value: 365 * 24 * 60 * 60 * 1000 }, // 1 year
    { label: "Over a year ago", value: 365 * 24 * 60 * 60 * 1000 }, // Also 1 year. Logic differs.
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentTimeRange, setCurrentTimeRange] = useState(
    JSON.stringify(timeRangeOptions[2]) // Default: Last 7 days
  );

  const filteredRecentNotes = notes.filter((note) => {
    const noteTime = new Date() - objectToDate(note.lastEditDate);
    const parsedTimeRange = JSON.parse(currentTimeRange);
    const isOverAYearAgo = parsedTimeRange.label === "Over a year ago";
    const timeValue = parsedTimeRange.value;

    // Time-based filtering
    const isWithinTimeRange = isOverAYearAgo
      ? noteTime > timeValue
      : noteTime <= timeValue;

    if (!isWithinTimeRange) return false;

    if (searchTerm === "") {
      return true;
    } else if (
      searchTerm.startsWith("notebook:") ||
      searchTerm.startsWith("book:")
    ) {
      // Search by notebook
      const thisNoteAssignedTo = note.assignedTo[1].toLowerCase();
      const searchedNotebook = searchTerm.split(":")[1].trim().toLowerCase();
      return thisNoteAssignedTo.includes(searchedNotebook);
    } else if (
      searchTerm.startsWith("tag:") ||
      searchTerm.startsWith("tags:")
    ) {
      // Search by tag
      const thisNoteTags = note.tags.map((tag) => tag.toLowerCase());
      const searchedTags = searchTerm
        .split(":")[1]
        .toLowerCase()
        .trim()
        .replace(/ {2,}/g, " ")
        .split(" ");

      if (user.preferences.strictTagMatching) {
        return searchedTags.every((tag) => thisNoteTags.includes(tag));
      } else {
        return searchedTags.some((tag) => thisNoteTags.includes(tag));
      }
    } else {
      // General search
      const lowerName = note.name.toLowerCase();
      const lowerTags = note.tags.map((tag) => tag.toLowerCase());
      const searchTerms = searchTerm.toLowerCase().split(/\s+/); // split by space
      return (
        lowerName.includes(searchTerm.toLowerCase()) ||
        searchTerms.some((term) => lowerTags.includes(term))
      );
    }
  });

  const filteredRecentNotebooks = notebooks.filter((notebook) => {
    const noteTime = new Date() - objectToDate(notebook.lastEditDate);
    const parsedTimeRange = JSON.parse(currentTimeRange);
    const isOverAYearAgo = parsedTimeRange.label === "Over a year ago";
    const timeValue = parsedTimeRange.value;

    // Time filter
    const isWithinTimeRange = isOverAYearAgo
      ? noteTime > timeValue
      : noteTime <= timeValue;

    if (!isWithinTimeRange) return false;

    if (searchTerm === "") {
      return true;
    } else if (
      searchTerm.startsWith("tag:") ||
      searchTerm.startsWith("tags:")
    ) {
      // Search by tag
      const notebookTags = notebook.tags.map((tag) => tag.toLowerCase());
      const searchedTags = searchTerm
        .split(":")[1]
        .toLowerCase()
        .trim()
        .replace(/ {2,}/g, " ")
        .split(" ");

      if (user.preferences.strictTagMatching) {
        return searchedTags.every((tag) => notebookTags.includes(tag));
      } else {
        return searchedTags.some((tag) => notebookTags.includes(tag));
      }
    } else {
      // General search
      const lowerName = notebook.name.toLowerCase();
      const lowerTags = notebook.tags.map((tag) => tag.toLowerCase());
      const searchTerms = searchTerm.toLowerCase().split(/\s+/);

      return (
        lowerName.includes(searchTerm.toLowerCase()) ||
        searchTerms.some((term) => lowerTags.includes(term))
      );
    }
  });

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleSelectChange(e) {
    console.log(e.target.value);
    setCurrentTimeRange(e.target.value);
  }

  return (
    <div className="flex-1 bg-base-300 h-[100vh] py-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      {notesView == APP_CONSTANTS.VIEW_NOTE_EDITOR ? (
        <NoteEditor />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-8 relative">
            <h1 className="text-3xl font-bold">Recent</h1>
            <div className="flex gap-2 absolute left-1/2 -translate-x-1/2">
              <div className="w-2xl input focus-within:input-primary">
                <Search className="text-secondary" />
                <input
                  className=""
                  placeholder="Search tagged items"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="">
                <select
                  className="select"
                  value={currentTimeRange}
                  onChange={handleSelectChange}
                >
                  {timeRangeOptions.map((range, id) => {
                    return (
                      <option value={JSON.stringify(range)}>
                        {range.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <ViewSwitcher />
          </div>

          <div className="divider"></div>

          {/* Content */}
          <div className="px-8">
            {filteredRecentNotes.length === 0 &&
            filteredRecentNotebooks.length === 0 ? (
              <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-secondary mt-4 select-none">
                <p className="whitespace-pre-line text-center">
                  {APP_CONSTANTS.NO_RECENT_ITEMS}
                </p>
              </div>
            ) : (
              <>
                {notesView === APP_CONSTANTS.VIEW_GRID ? (
                  <div className="flex flex-col gap-4 mt-4">
                    {/* Grid Notebooks */}
                    {filteredRecentNotebooks.length > 0 && (
                      <>
                        <h2 className="text-xl font-semibold">
                          {`Notebooks (${filteredRecentNotebooks.length})`}
                        </h2>
                        <div className="flex flex-wrap gap-5">
                          {filteredRecentNotebooks.map((notebook, id) => (
                            <GridNotebook key={id} notebookObject={notebook} />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Grid Notes */}
                    {filteredRecentNotes.length > 0 && (
                      <>
                        <h2
                          className={
                            filteredRecentNotebooks.length == 0
                              ? "text-xl font-semibold"
                              : "text-xl font-semibold mt-4"
                          }
                        >
                          {`Notes (${filteredRecentNotes.length})`}
                        </h2>
                        <div className="flex flex-wrap gap-5">
                          {filteredRecentNotes.map((note, id) => (
                            <GridNote key={id} noteObject={note} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : notesView === APP_CONSTANTS.VIEW_TABLE ? (
                  <div className="space-y-8 mt-4">
                    {/* Table Notebooks */}
                    {filteredRecentNotebooks.length > 0 && (
                      <div className="">
                        <h2 className="text-xl font-semibold mb-4">
                          {`Notebooks (${filteredRecentNotebooks.length})`}
                        </h2>
                        <div className="mt-2">
                          {filteredRecentNotebooks.map((notebook, id) => (
                            <TableNotebook
                              key={id}
                              id={id}
                              notebookObject={notebook}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Table Notes */}
                    {filteredRecentNotes.length > 0 && (
                      <div className="">
                        <h2 className="text-xl font-semibold mb-4">{`Notes (${filteredRecentNotes.length})`}</h2>
                        <div className="mt-2">
                          {filteredRecentNotes.map((note, id) => (
                            <TableNote key={id} id={id} noteObject={note} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default RecentArea;
