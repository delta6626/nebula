import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useState } from "react";
import { Search, LayoutGrid, Table } from "lucide-react";
import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useUserStore } from "../../store/userStore";
import GridNote from "../components/GridNote";
import GridNotebook from "../components/GridNotebook";
import TableNote from "../components/TableNote";
import TableNotebook from "../components/TableNotebook";
import NoteEditor from "../components/NoteEditor";
import ViewSwitcher from "../components/ViewSwitcher";

function UntaggedArea() {
  const { notesView, setNotesView } = useCurrentNotesViewStore();
  const { notes } = useNotesStore();
  const { notebooks } = useNotebooksStore();
  const { user } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUntaggedNotes = notes.filter((note) => {
    if (searchTerm == "") {
      return note.tags.length == 0;
    } else if (
      searchTerm.startsWith("notebook:") ||
      searchTerm.startsWith("book:")
    ) {
      const thisNoteAssignedTo = note.assignedTo[1].toLowerCase();
      const searchedNotebook = searchTerm.split(":")[1].trim().toLowerCase();
      return (
        note.tags.length == 0 && thisNoteAssignedTo.includes(searchedNotebook)
      );
    } else {
      const lowerName = note.name.toLowerCase();
      return (
        note.tags.length == 0 && lowerName.includes(searchTerm.toLowerCase())
      );
    }
  });

  const filteredUntaggedNotebooks = notebooks.filter((notebook) => {
    if (searchTerm == "") {
      return notebook.tags.length == 0;
    } else {
      const lowerName = notebook.name.toLowerCase();
      return (
        notebook.tags.length == 0 &&
        lowerName.includes(searchTerm.toLowerCase())
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
            <h1 className="text-3xl font-bold">Untagged</h1>
            <div className="flex absolute left-1/2 -translate-x-1/2">
              <div className="w-2xl input focus-within:input-primary">
                <Search className="text-gray-400" />
                <input
                  className=""
                  placeholder="Search untagged items"
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
            {filteredUntaggedNotes.length === 0 &&
            filteredUntaggedNotebooks.length === 0 ? (
              <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-gray-400 mt-4 select-none">
                <p className="whitespace-pre-line text-center">
                  {APP_CONSTANTS.NO_UNTAGGED_ITEMS}
                </p>
              </div>
            ) : (
              <>
                {notesView === APP_CONSTANTS.VIEW_GRID ? (
                  <div className="flex flex-col gap-4 mt-4">
                    {/* Grid Notebooks */}
                    {filteredUntaggedNotebooks.length > 0 && (
                      <>
                        <h2 className="text-xl font-semibold">
                          {`Notebooks (${filteredUntaggedNotebooks.length})`}
                        </h2>
                        <div className="flex flex-wrap gap-5">
                          {filteredUntaggedNotebooks.map((notebook, id) => (
                            <GridNotebook key={id} notebookObject={notebook} />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Grid Notes */}
                    {filteredUntaggedNotes.length > 0 && (
                      <>
                        <h2
                          className={
                            filteredUntaggedNotebooks.length == 0
                              ? "text-xl font-semibold"
                              : "text-xl font-semibold mt-4"
                          }
                        >
                          {`Notes (${filteredUntaggedNotes.length})`}
                        </h2>
                        <div className="flex flex-wrap gap-5">
                          {filteredUntaggedNotes.map((note, id) => (
                            <GridNote key={id} noteObject={note} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : notesView === APP_CONSTANTS.VIEW_TABLE ? (
                  <div className="space-y-8 mt-4">
                    {/* Table Notebooks */}
                    {filteredUntaggedNotebooks.length > 0 && (
                      <div className="">
                        <h2 className="text-xl font-semibold mb-4">
                          {`Notebooks (${filteredUntaggedNotebooks.length})`}
                        </h2>
                        <div className="rounded-lg bg-base-100 p-4">
                          <table className="table">
                            <thead>
                              <tr className="text-lg">
                                <th>#</th>
                                <th>Name</th>
                                <th>Tags</th>
                                <th>Created</th>
                                <th>Last edited</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUntaggedNotebooks.map((notebook, id) => (
                                <TableNotebook
                                  key={id}
                                  id={id}
                                  notebookObject={notebook}
                                />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Table Notes */}
                    {filteredUntaggedNotes.length > 0 && (
                      <div className="">
                        <h2 className="text-xl font-semibold mb-4">{`Notes (${filteredUntaggedNotes.length})`}</h2>
                        <div className="rounded-lg bg-base-100 p-4">
                          <table className="table">
                            <thead>
                              <tr className="text-lg">
                                <th>#</th>
                                <th>Name</th>
                                <th>Content</th>
                                <th>Notebook</th>
                                <th>Tags</th>
                                <th>Created</th>
                                <th>Last edited</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUntaggedNotes.map((note, id) => (
                                <TableNote key={id} id={id} noteObject={note} />
                              ))}
                            </tbody>
                          </table>
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

export default UntaggedArea;
