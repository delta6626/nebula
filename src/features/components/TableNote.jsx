import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { objectToDate } from "../../utils/objectToDate";
import { formatDateDDMMYY } from "../../utils/formatDateDDMMYY";
import Tag from "./Tag";
import { PinOff, Pin, FileEdit, Trash2 } from "lucide-react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotesStore } from "../../store/notesStore";
import { useMessageStore } from "../../store/messageStore";
import { hardDeleteNote, updatePinStatus } from "../../firebase/services";
import { useEditTargetNoteStore } from "../../store/editTargetNoteStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { sanitizeHTML } from "../../utils/sanitizeHTML";
import { useState } from "react";
import NotebookChip from "./NotebookChip";

function TableNote({ id, noteObject }) {
  const { notes, setNotes } = useNotesStore();
  const { message, setMessage } = useMessageStore();
  const { setEditTargetNote } = useEditTargetNoteStore();
  const { setNotesView } = useCurrentNotesViewStore();

  const [updatingPin, setUpdatingPin] = useState(false);
  const [deletingNote, setDeletingNote] = useState(false);

  function handleNoteClick() {
    setEditTargetNote(noteObject);
    setNotesView(APP_CONSTANTS.VIEW_NOTE_EDITOR);
  }

  function handleNotePinAndUnpin(noteId) {
    setUpdatingPin(true);

    updatePinStatus(noteObject.id, noteObject.pinned)
      .then(() => {
        setNotes(
          notes.map((note) =>
            note.id === noteId ? { ...note, pinned: !note.pinned } : note
          )
        );
        setUpdatingPin(false);
      })
      .catch((error) => {
        setUpdatingPin(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: () =>
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close(),
          secondButtonOnClick: () => {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function handleNoteEditButtonClick(e) {
    e.stopPropagation();
    setEditTargetNote(noteObject);
    document.getElementById(APP_CONSTANTS.EDIT_NOTE_MODAL).showModal();
  }

  function deleteCurrentNote() {
    hardDeleteNote(noteObject.id)
      .then(() => {
        setDeletingNote(false);
        setNotes(notes.filter((note) => note.id !== noteObject.id));
        setMessage({
          title: APP_CONSTANTS.SUCCESS_MODAL_TITLE,
          textContent: APP_CONSTANTS.SUCCESS_MODAL_TEXT_CONTENT,
          firstButtonClassName: "btn btn-primary",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: () =>
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close(),
          secondButtonOnClick: () => {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      })
      .catch((error) => {
        setDeletingNote(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: () =>
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close(),
          secondButtonOnClick: () => {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function handleDeleteButtonClick(e) {
    e.stopPropagation();
    setMessage({
      title: APP_CONSTANTS.DELETE_NOTE_MODAL_TITLE,
      textContent: APP_CONSTANTS.DELETE_NOTE_MODAL_TEXT_CONTENT,
      firstButtonClassName: "btn btn-error",
      secondButtonClassName: "btn",
      firstButtonText: APP_CONSTANTS.DELETE,
      secondButtonText: APP_CONSTANTS.CANCEL,
      firstButtonOnClick: () => {
        deleteCurrentNote();
        setDeletingNote(true);
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
      },
      secondButtonOnClick: () =>
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close(),
    });
    document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
  }

  return (
    <div
      className="mt-2 w-full bg-base-100 rounded-lg p-4 select-none cursor-pointer grid gap-4 items-center"
      style={{
        gridTemplateColumns: `
          1fr
          2fr
          0.5fr
          2fr
          max-content
          max-content
          auto
        `,
      }}
      onClick={handleNoteClick}
    >
      {/* Title */}
      <div className="text-xl break-words" title={noteObject.name}>
        {noteObject.name}
      </div>

      {/* Content */}
      <div className="text-secondary break-words">
        {(() => {
          const plain = sanitizeHTML(noteObject.content);
          return plain.trim()
            ? plain.length > 200
              ? plain.slice(0, 200) + ".."
              : plain
            : APP_CONSTANTS.NOTE_EMPTY;
        })()}
      </div>

      {/* Notebook */}
      <div className="">
        <NotebookChip
          bookIcon={false}
          notebookName={noteObject.assignedTo[1]}
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 items-center overflow-hidden">
        {noteObject.tags.length === 0 ? (
          <p className="text-secondary">{APP_CONSTANTS.NO_TAGS}</p>
        ) : null}
        {noteObject.tags.slice(0, 10).map((tag, index) => (
          <Tag
            key={index}
            tagText={tag}
            showTagIcon={false}
            source={APP_CONSTANTS.SOURCE_NOTE}
          />
        ))}
        {noteObject.tags.length > 10 && (
          <Tag
            key="more"
            moreTag={true}
            tagText={`${noteObject.tags.length - 10} more`}
          />
        )}
      </div>

      {/* Created Date */}
      <div className="whitespace-nowrap text-secondary text-sm">
        {formatDateDDMMYY(objectToDate(noteObject.creationDate))}
      </div>

      {/* Last Edited */}
      <div className="whitespace-nowrap text-secondary text-sm">
        {dateDistanceFromNow(objectToDate(noteObject.lastEditDate))}
      </div>

      {/* Actions */}
      <div className={"flex flex-col gap-2"}>
        <div
          className="tooltip"
          data-tip={
            noteObject.pinned ? "Unpin from dashboard" : "Pin to dashboard"
          }
        >
          <button
            className="btn btn-square"
            disabled={updatingPin}
            onClick={(e) => {
              e.stopPropagation();
              handleNotePinAndUnpin(noteObject.id);
            }}
          >
            {updatingPin ? (
              <span className="loading loading-spinner"></span>
            ) : noteObject.pinned ? (
              <PinOff size={20} />
            ) : (
              <Pin size={20} />
            )}
          </button>
        </div>

        <div className="tooltip" data-tip="Edit details">
          <button
            className="btn btn-square"
            onClick={handleNoteEditButtonClick}
          >
            <FileEdit size={20} />
          </button>
        </div>

        <div className="tooltip tooltip-error" data-tip="Delete note">
          <button
            className="btn btn-square text-error"
            disabled={deletingNote}
            onClick={handleDeleteButtonClick}
          >
            {deletingNote ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <Trash2 size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableNote;
