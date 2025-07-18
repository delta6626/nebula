import { Search } from "lucide-react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotesStore } from "../../store/notesStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useUserStore } from "../../store/userStore";
import { useNoteSearchTermStore } from "../../store/noteSearchTermStore";
import GridNote from "../components/GridNote";
import TableNote from "../components/TableNote";
import NoteEditor from "../components/NoteEditor";
import ViewSwitcher from "../components/ViewSwitcher";

function NotesArea() {
  const { notes } = useNotesStore();
  const { notesView } = useCurrentNotesViewStore();
  const { user } = useUserStore();
  const { noteSearchTerm, setNoteSearchTerm } = useNoteSearchTermStore();

  const filteredNotes = notes.filter((note) => {
    if (noteSearchTerm === "") {
      return note;
    } else if (
      noteSearchTerm.startsWith("notebook:") ||
      noteSearchTerm.startsWith("book:")
    ) {
      // Search by notebook

      const thisNoteAssignedTo = note.assignedTo[1].toLowerCase();
      const searchedNotebook = noteSearchTerm
        .split(":")[1]
        .trim()
        .toLowerCase();
      return thisNoteAssignedTo.includes(searchedNotebook);
    } else if (
      noteSearchTerm.startsWith("tag:") ||
      noteSearchTerm.startsWith("tags:")
    ) {
      // Search by tag

      const thisNoteTags = note.tags.map((tag) => tag.toLowerCase());
      const searchedTags = noteSearchTerm
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
      const lowerName = note.name.toLowerCase();
      const lowerTags = note.tags.map((tag) => tag.toLowerCase());
      const searchTerms = noteSearchTerm.toLowerCase().split(/\s+/); // split by space
      return (
        lowerName.includes(noteSearchTerm.toLowerCase()) ||
        searchTerms.some((term) => lowerTags.includes(term))
      );
    }
  });

  function handleSearch(e) {
    setNoteSearchTerm(e.target.value);
  }

  // This feature was moved to the sidebar

  // function handleNewNoteButtonClick() {
  //   document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).showModal();
  // }

  return (
    <div className="flex-1 bg-base-300 h-[100vh] py-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      {notesView == APP_CONSTANTS.VIEW_NOTE_EDITOR ? (
        <NoteEditor></NoteEditor>
      ) : (
        <>
          <div className="flex items-center justify-between px-8 relative">
            <h1 className="text-2xl font-bold">Notes</h1>
            <div className="flex absolute left-1/2 -translate-x-1/2">
              <div className="md:w-sm lg:w-lg xl:w-xl 2xl:w-2xl input focus-within:input-primary">
                <Search className="text-secondary"></Search>
                <input
                  className=""
                  placeholder="Search notes"
                  type="text"
                  value={noteSearchTerm}
                  onChange={handleSearch}
                />
              </div>

              {/* This feature was moved to the sidebar */}

              {/* <div
                className={!userVerified ? "tooltip tooltip-right" : ""}
                data-tip={APP_CONSTANTS.VERIFY_EMAIL}
              >
                <div className="tooltip tooltip-bottom" data-tip={"New note"}>
                  <button
                    className="btn btn-primary btn-square ml-2"
                    disabled={!userVerified}
                    onClick={handleNewNoteButtonClick}
                  >
                    <FilePlus></FilePlus>
                  </button>
                </div>
              </div> */}
            </div>

            <ViewSwitcher />
          </div>

          <div className="divider"></div>

          <div className="px-8">
            {noteSearchTerm == "" && filteredNotes.length != 0 ? (
              <h3 className="text-xl font-semibold">
                All notes ({filteredNotes.length})
              </h3>
            ) : noteSearchTerm != "" && filteredNotes.length != 0 ? (
              <h3 className="text-xl font-semibold">
                Results for “{noteSearchTerm}” — {filteredNotes.length} found
              </h3>
            ) : (
              ""
            )}

            {notesView === APP_CONSTANTS.VIEW_GRID ? (
              filteredNotes.length > 0 ? (
                <div className="flex gap-5 flex-wrap mt-4">
                  {filteredNotes.map((note, id) => (
                    <GridNote key={id} noteObject={note} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-secondary mt-4 select-none">
                  <p className="whitespace-pre-line text-center">
                    {APP_CONSTANTS.NO_NOTES}
                  </p>
                </div>
              )
            ) : notesView === APP_CONSTANTS.VIEW_TABLE ? (
              filteredNotes.length > 0 ? (
                <div className="mt-4">
                  {filteredNotes.map((note, id) => (
                    <TableNote key={id} id={id} noteObject={note} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-secondary mt-4 select-none">
                  <p className="whitespace-pre-line text-center">
                    {APP_CONSTANTS.NO_NOTES}
                  </p>
                </div>
              )
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default NotesArea;
