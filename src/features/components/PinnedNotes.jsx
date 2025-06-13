import { useNotesStore } from "../../store/notesStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import NoteEditor from "./NoteEditor";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import GridNote from "./GridNote";
import TableNote from "./TableNote";

function PinnedNotes() {
  const { notes } = useNotesStore();
  const { notesView } = useCurrentNotesViewStore();

  const pinnedNotes = notes.filter((note) => {
    return note.pinned === true;
  });

  return (
    <div className="pr-8">
      <h1 className="text-xl font-semibold mt-8">Pinned notes</h1>
      {notesView === APP_CONSTANTS.VIEW_NOTE_EDITOR ? (
        <NoteEditor />
      ) : pinnedNotes.length == 0 ? (
        <div className="w-full h-[60vh] flex items-center justify-center text-secondary">
          <p className="whitespace-pre-line text-center select-none">
            {APP_CONSTANTS.NO_PINNED_ITEMS}
          </p>
        </div>
      ) : (
        <div className="mt-4">
          {notesView === APP_CONSTANTS.VIEW_GRID ? (
            <div className="flex flex-wrap gap-5">
              {pinnedNotes.map((note, id) => {
                return <GridNote key={id} noteObject={note} />;
              })}
            </div>
          ) : (
            <div className="mt-2">
              {pinnedNotes.map((note, id) => (
                <TableNote key={id} id={id} noteObject={note} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PinnedNotes;
