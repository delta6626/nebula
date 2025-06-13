import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useState } from "react";
import { Search } from "lucide-react";
import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useUserStore } from "../../store/userStore";
import GridNote from "../components/GridNote";
import GridNotebook from "../components/GridNotebook";
import TableNote from "../components/TableNote";
import TableNotebook from "../components/TableNotebook";
import NoteEditor from "../components/NoteEditor";
import ViewSwitcher from "../components/ViewSwitcher";

function TaggedArea() {
  const { notesView } = useCurrentNotesViewStore();
  const { notes } = useNotesStore();
  const { notebooks } = useNotebooksStore();
  const { user } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTaggedNotes = notes.filter((note) => {
    if (searchTerm == "") {
      return note.tags.length > 0;
    } else if (
      searchTerm.startsWith("notebook:") ||
      searchTerm.startsWith("book:")
    ) {
      const thisNoteAssignedTo = note.assignedTo[1].toLowerCase();
      const searchedNotebook = searchTerm.split(":")[1].trim().toLowerCase();
      return (
        note.tags.length > 0 && thisNoteAssignedTo.includes(searchedNotebook)
      );
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
          note.tags.length > 0 &&
          searchedTags.every((tag) => thisNoteTags.includes(tag))
        );
      } else {
        return (
          note.tags.length > 0 &&
          searchedTags.some((tag) => thisNoteTags.includes(tag))
        );
      }
    } else {
      const lowerName = note.name.toLowerCase();
      const lowerTags = note.tags.map((tag) => tag.toLowerCase());
      const searchTerms = searchTerm.toLowerCase().split(/\s+/); // split by space
      return (
        note.tags.length > 0 &&
        (lowerName.includes(searchTerm.toLowerCase()) ||
          searchTerms.some((term) => lowerTags.includes(term)))
      );
    }
  });

  const filteredTaggedNotebooks = notebooks.filter((notebook) => {
    if (searchTerm == "") {
      return notebook.tags.length > 0;
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
          notebook.tags.length > 0 &&
          searchedTags.every((tag) => thisNotebookTags.includes(tag))
        );
      } else {
        return (
          notebook.tags.length > 0 &&
          searchedTags.some((tag) => thisNotebookTags.includes(tag))
        );
      }
    } else {
      const lowerName = notebook.name.toLowerCase();
      const lowerTags = notebook.tags.map((tag) => tag.toLowerCase());
      const searchTerms = searchTerm.toLowerCase().split(/\s+/); // split by space
      return (
        notebook.tags.length > 0 &&
        (lowerName.includes(searchTerm.toLowerCase()) ||
          searchTerms.some((term) => lowerTags.includes(term)))
      );
    }
  });

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="flex-1 bg-base-300 h-[100vh] py-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      {notesView == APP_CONSTANTS.VIEW_NOTE_EDITOR ? (
        <NoteEditor />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-8 relative">
            <h1 className="text-3xl font-bold">Tagged</h1>
            <div className="flex absolute left-1/2 -translate-x-1/2">
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
            </div>

            <ViewSwitcher />
          </div>

          <div className="divider"></div>

          {/* Content */}
          <div className="px-8">
            {filteredTaggedNotes.length === 0 &&
            filteredTaggedNotebooks.length === 0 ? (
              <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-secondary mt-4 select-none">
                <p className="whitespace-pre-line text-center">
                  {APP_CONSTANTS.NO_TAGGED_ITEMS}
                </p>
              </div>
            ) : (
              <>
                {notesView === APP_CONSTANTS.VIEW_GRID ? (
                  <div className="flex flex-col gap-4 mt-4">
                    {/* Grid Notebooks */}
                    {filteredTaggedNotebooks.length > 0 && (
                      <>
                        <h2 className="text-xl font-semibold">
                          {`Notebooks (${filteredTaggedNotebooks.length})`}
                        </h2>
                        <div className="flex flex-wrap gap-5">
                          {filteredTaggedNotebooks.map((notebook, id) => (
                            <GridNotebook key={id} notebookObject={notebook} />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Grid Notes */}
                    {filteredTaggedNotes.length > 0 && (
                      <>
                        <h2
                          className={
                            filteredTaggedNotebooks.length == 0
                              ? "text-xl font-semibold"
                              : "text-xl font-semibold mt-4"
                          }
                        >
                          {`Notes (${filteredTaggedNotes.length})`}
                        </h2>
                        <div className="flex flex-wrap gap-5">
                          {filteredTaggedNotes.map((note, id) => (
                            <GridNote key={id} noteObject={note} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : notesView === APP_CONSTANTS.VIEW_TABLE ? (
                  <div className="space-y-8 mt-4">
                    {/* Table Notebooks */}
                    {filteredTaggedNotebooks.length > 0 && (
                      <div className="">
                        <h2 className="text-xl font-semibold mb-4">
                          {`Notebooks (${filteredTaggedNotebooks.length})`}
                        </h2>
                        <div className="mt-2">
                          {filteredTaggedNotebooks.map((notebook, id) => (
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
                    {filteredTaggedNotes.length > 0 && (
                      <div className="">
                        <h2 className="text-xl font-semibold mb-4">{`Notes (${filteredTaggedNotes.length})`}</h2>
                        <div className="mt-2">
                          {filteredTaggedNotes.map((note, id) => (
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

export default TaggedArea;
