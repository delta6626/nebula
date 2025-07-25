import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useState } from "react";
import { MenuIcon, Search } from "lucide-react";
import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useUserStore } from "../../store/userStore";
import { useDashboardHamburgerStore } from "../../store/dashboardHamburgerStore";
import GridNote from "../components/GridNote";
import GridNotebook from "../components/GridNotebook";
import TableNote from "../components/TableNote";
import TableNotebook from "../components/TableNotebook";
import NoteEditor from "../components/NoteEditor";
import ViewSwitcher from "../components/ViewSwitcher";

function PinnedArea() {
  const { notesView } = useCurrentNotesViewStore();
  const { notes } = useNotesStore();
  const { notebooks } = useNotebooksStore();
  const { user } = useUserStore();
  const { setDashboardHamburgerOpen } = useDashboardHamburgerStore();

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  const filteredPinnedNotes = notes.filter((note) => {
    if (searchTerm == "") {
      return note.pinned == true;
    } else if (
      searchTerm.startsWith("notebook:") ||
      searchTerm.startsWith("book:")
    ) {
      const thisNoteAssignedTo = note.assignedTo[1].toLowerCase();
      const searchedNotebook = searchTerm.split(":")[1].trim().toLowerCase();
      return note.pinned && thisNoteAssignedTo.includes(searchedNotebook);
    } else if (
      searchTerm.startsWith("tag:") ||
      searchTerm.startsWith("tags:")
    ) {
      const thisNoteTags = note.tags.map((tag) => tag.toLowerCase());
      const searchedTags = searchTerm
        .split(":")[1]
        .toLowerCase()
        .trim()
        .replace(/ {2,}/g, " ")
        .split(" ");

      if (user.preferences.strictTagMatching) {
        return (
          note.pinned && searchedTags.every((tag) => thisNoteTags.includes(tag))
        );
      } else {
        return (
          note.pinned && searchedTags.some((tag) => thisNoteTags.includes(tag))
        );
      }
    } else {
      const lowerName = note.name.toLowerCase();
      const lowerTags = note.tags.map((tag) => tag.toLowerCase());
      const searchTerms = searchTerm.toLowerCase().split(/\s+/); // split by space
      return (
        note.pinned &&
        (lowerName.includes(searchTerm.toLowerCase()) ||
          searchTerms.some((term) => lowerTags.includes(term)))
      );
    }
  });

  const filteredPinnedNotebooks = notebooks.filter((notebook) => {
    if (searchTerm == "") {
      return notebook.pinned == true;
    } else if (
      searchTerm.startsWith("tag:") ||
      searchTerm.startsWith("tags:")
    ) {
      const thisNotebookTags = notebook.tags.map((tag) => tag.toLowerCase());
      const searchedTags = searchTerm
        .split(":")[1]
        .toLowerCase()
        .trim()
        .replace(/ {2,}/g, " ")
        .split(" ");

      if (user.preferences.strictTagMatching) {
        return (
          notebook.pinned &&
          searchedTags.every((tag) => thisNotebookTags.includes(tag))
        );
      } else {
        return (
          notebook.pinned &&
          searchedTags.some((tag) => thisNotebookTags.includes(tag))
        );
      }
    } else {
      const lowerName = notebook.name.toLowerCase();
      const lowerTags = notebook.tags.map((tag) => tag.toLowerCase());
      const searchTerms = searchTerm.toLowerCase().split(/\s+/); // split by space
      return (
        notebook.pinned &&
        (lowerName.includes(searchTerm.toLowerCase()) ||
          searchTerms.some((term) => lowerTags.includes(term)))
      );
    }
  });

  function handleMenuOpen() {
    setDashboardHamburgerOpen(true);
  }

  return (
    <div className="flex-1 bg-base-300 h-[100vh] py-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      {notesView == APP_CONSTANTS.VIEW_NOTE_EDITOR ? (
        <NoteEditor />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-8 relative">
            <div className="flex items-center text-2xl font-bold gap-2">
              <button
                className="xl:hidden btn btn-square"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </button>
              Pinned
            </div>
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
              <div className="lg:w-lg xl:w-xl 2xl:w-2xl input focus-within:input-primary">
                <Search className="text-secondary" />
                <input
                  className=""
                  placeholder="Search tagged items"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <ViewSwitcher />
          </div>

          <div className="divider"></div>

          {/* Content */}
          <div className="px-8">
            <div className="w-full lg:hidden input focus-within:input-primary">
              <Search className="text-secondary" />
              <input
                className=""
                placeholder="Search tagged items"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {filteredPinnedNotes.length === 0 &&
            filteredPinnedNotebooks.length === 0 ? (
              <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-secondary mt-4 select-none">
                <p className="whitespace-pre-line text-center">
                  {APP_CONSTANTS.NO_PINNED_ITEMS}
                </p>
              </div>
            ) : (
              <>
                {notesView === APP_CONSTANTS.VIEW_GRID ? (
                  <div className="flex flex-col gap-4 mt-4">
                    {/* Grid Notebooks */}
                    {filteredPinnedNotebooks.length > 0 && (
                      <>
                        <h2 className="text-xl font-semibold">
                          {`Notebooks (${filteredPinnedNotebooks.length})`}
                        </h2>
                        <div className="flex flex-wrap gap-5">
                          {filteredPinnedNotebooks.map((notebook, id) => (
                            <GridNotebook key={id} notebookObject={notebook} />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Grid Notes */}
                    {filteredPinnedNotes.length > 0 && (
                      <>
                        <h2
                          className={
                            filteredPinnedNotebooks.length == 0
                              ? "text-xl font-semibold"
                              : "text-xl font-semibold mt-4"
                          }
                        >
                          {`Notes (${filteredPinnedNotes.length})`}
                        </h2>
                        <div className="flex flex-wrap gap-5">
                          {filteredPinnedNotes.map((note, id) => (
                            <GridNote key={id} noteObject={note} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : notesView === APP_CONSTANTS.VIEW_TABLE ? (
                  <div className="space-y-8 mt-4">
                    {/* Table Notebooks */}
                    {filteredPinnedNotebooks.length > 0 && (
                      <div className="">
                        <h2 className="text-xl font-semibold mb-4">
                          {`Notebooks (${filteredPinnedNotebooks.length})`}
                        </h2>
                        <div className="mt-2">
                          {filteredPinnedNotebooks.map((notebook, id) => (
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
                    {filteredPinnedNotes.length > 0 && (
                      <div className="">
                        <h2 className="text-xl font-semibold mb-4">{`Notes (${filteredPinnedNotes.length})`}</h2>
                        <div className="mt-2">
                          {filteredPinnedNotes.map((note, id) => (
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

export default PinnedArea;
