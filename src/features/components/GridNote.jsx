import {
  Clock,
  Ellipsis,
  FileEdit,
  PenSquare,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { objectToDate } from "../../utils/objectToDate";
import { formatDateMonthDayYear } from "../../utils/formatDateMonthDayYear";
import Tag from "./Tag";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotesStore } from "../../store/notesStore";
import { hardDeleteNote, updatePinStatus } from "../../firebase/services";
import { useMessageStore } from "../../store/messageStore";
import { useEditTargetNoteStore } from "../../store/editTargetNoteStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { sanitizeHTML } from "../../utils/sanitizeHTML";
import { useState } from "react";
import NotebookChip from "./NotebookChip";

function GridNote({ noteObject }) {
  const { notes, setNotes } = useNotesStore();
  const { setMessage } = useMessageStore();
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
            note.id == noteId ? { ...note, pinned: !note.pinned } : note,
          ),
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
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
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
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
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
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
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
      firstButtonOnClick: function () {
        deleteCurrentNote();
        setDeletingNote(true);
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
      },
      secondButtonOnClick: function () {
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
      },
    });
    document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
  }

  return (
    <div
      className="w-70 2xl:w-90 bg-base-100 rounded-lg p-4 select-none cursor-pointer"
      onClick={handleNoteClick}
    >
      <div className="flex gap-2 items-center justify-between">
        <h3
          className="text-2xl font-semibold overflow-hidden whitespace-nowrap truncate"
          title={noteObject.name}
        >
          {noteObject.name}
        </h3>

        {/* Previous layout of action items */}

        {/* <div className="flex gap-2">
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
                <PinOff size={20}></PinOff>
              ) : (
                <Pin size={20}></Pin>
              )}
            </button>
          </div>

          <div className="tooltip" data-tip="Edit details">
            <button
              className="btn btn-square"
              onClick={handleNoteEditButtonClick}
            >
              <FileEdit size={20}></FileEdit>
            </button>
          </div>

          <div className="tooltip tooltip-error" data-tip="Delete note">
            <button
              className="btn btn-square text-error"
              onClick={handleDeleteButtonClick}
              disabled={deletingNote}
            >
              {deletingNote ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Trash2 size={20}></Trash2>
              )}
            </button>
          </div>
        </div> */}

        {/* New layour for action items */}

        <div
          className="dropdown dropdown-end"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div tabIndex={0} role="button" className="btn btn-square">
            {updatingPin || deletingNote ? (
              <span
                className={
                  deletingNote
                    ? "loading loading-spinner text-error"
                    : "loading loading-spinner"
                }
              ></span>
            ) : (
              <Ellipsis />
            )}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box z-1 w-42 p-2 shadow-sm mt-2"
          >
            <button
              className="btn flex justify-start"
              onClick={(e) => {
                e.stopPropagation();
                handleNotePinAndUnpin(noteObject.id);
              }}
              disabled={updatingPin}
            >
              {noteObject.pinned ? (
                <div className="flex gap-2">
                  <PinOff size={20}></PinOff>
                  Unpin note
                </div>
              ) : (
                <div className="flex gap-2">
                  <Pin size={20}></Pin>
                  Pin note
                </div>
              )}
            </button>
            <button
              className="btn flex justify-start"
              onClick={handleNoteEditButtonClick}
            >
              <FileEdit size={20}></FileEdit>
              Edit note
            </button>
            <button
              className="btn text-error flex justify-start"
              onClick={handleDeleteButtonClick}
              disabled={deletingNote}
            >
              {
                <div className="flex gap-2">
                  <Trash2 size={20} />
                  Delete note
                </div>
              }
            </button>
          </ul>
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-secondary text-sm">
        <NotebookChip
          bookIcon={true}
          notebookName={noteObject.assignedTo[1]}
        ></NotebookChip>
      </div>
      <div className="flex gap-4 mt-4 text-secondary text-sm">
        <p className="flex gap-2 items-center">
          <Clock size={20} />
          {formatDateMonthDayYear(objectToDate(noteObject.creationDate))}
        </p>

        <p className="flex gap-2 items-center">
          <PenSquare size={20} />
          {dateDistanceFromNow(objectToDate(noteObject.lastEditDate))}
        </p>
      </div>
      <div className="divider"></div>
      <div className="text-secondary">
        <p
          className={
            noteObject.tags.length != 0 ? "line-clamp-3" : "line-clamp-3 mb-4"
          }
        >
          {(() => {
            const plain = sanitizeHTML(noteObject.content);
            return plain.trim()
              ? plain.length > 200
                ? plain.slice(0, 200) + ".."
                : plain
              : APP_CONSTANTS.NOTE_EMPTY;
          })()}
        </p>
      </div>
      {noteObject.tags.length != 0 ? (
        <div className="divider"></div>
      ) : (
        <div className="">
          <div className="divider"></div>
          <p className="text-secondary mb-4">{APP_CONSTANTS.NO_TAGS}</p>
        </div>
      )}
      <div className="flex gap-2">
        <div className="flex gap-2 flex-wrap max-w-full overflow-hidden">
          {noteObject.tags.slice(0, 5).map((tag, index) => (
            <Tag
              key={index}
              tagText={tag}
              showTagIcon={true}
              source={APP_CONSTANTS.SOURCE_NOTE}
            />
          ))}
          {noteObject.tags.length > 5 && (
            <Tag
              key="more"
              moreTag={true}
              tagText={`${noteObject.tags.length - 5} more`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GridNote;
