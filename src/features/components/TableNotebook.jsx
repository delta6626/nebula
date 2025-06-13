import { FileEdit, Pin, PinOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import {
  hardDeleteNotebookAndLinkedNotes,
  updateNotebookPinStatus,
} from "../../firebase/services";
import { useActiveTabStore } from "../../store/activeTabStore";
import { useEditTargetNotebookStore } from "../../store/editTargetNotebookStore";
import { useMessageStore } from "../../store/messageStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useNoteSearchTermStore } from "../../store/noteSearchTermStore";
import { useNotesStore } from "../../store/notesStore";
import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { formatDateDDMMYY } from "../../utils/formatDateDDMMYY";
import { objectToDate } from "../../utils/objectToDate";
import Tag from "./Tag";

function TableNotebook({ notebookObject }) {
  const { notes, setNotes } = useNotesStore();
  const { notebooks, setNotebooks } = useNotebooksStore();
  const { setMessage } = useMessageStore();
  const { setEditTargetNotebook } = useEditTargetNotebookStore();
  const { setActiveTab } = useActiveTabStore();
  const { setNoteSearchTerm } = useNoteSearchTermStore();

  const [updatingPin, setUpdatingPin] = useState(false);
  const [deletingNotebook, setDeletingNotebook] = useState(false);

  function handleNotebookClick() {
    setNoteSearchTerm("book: " + notebookObject.name);
    setActiveTab(APP_CONSTANTS.NOTES_PAGE);
  }

  function handleNotebookPinAndUnpin() {
    setUpdatingPin(true);
    updateNotebookPinStatus(notebookObject.id, notebookObject.pinned)
      .then(() => {
        setNotebooks(
          notebooks.map((notebook) =>
            notebook.id === notebookObject.id
              ? { ...notebook, pinned: !notebook.pinned }
              : notebook,
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
          firstButtonOnClick: () =>
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close(),
          secondButtonOnClick: () => {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function handleNotebookEditButtonClick(e) {
    e.stopPropagation();
    setEditTargetNotebook(notebookObject);
    document.getElementById(APP_CONSTANTS.EDIT_NOTEBOOK_MODAL).showModal();
  }

  function deleteCurrentNotebook() {
    hardDeleteNotebookAndLinkedNotes(notebookObject.id, notebookObject.name)
      .then(() => {
        setDeletingNotebook(false);
        setNotes(
          notes.filter(
            (note) =>
              !(
                note.assignedTo[0] === notebookObject.id &&
                note.assignedTo[1] === notebookObject.name
              ),
          ),
        );
        setNotebooks(
          notebooks.filter((notebook) => notebook.id !== notebookObject.id),
        );
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
        setDeletingNotebook(false);
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
      title: APP_CONSTANTS.DELETE_NOTEBOOK_MODAL_TITLE,
      textContent: APP_CONSTANTS.DELETE_NOTEBOOK_MODAL_TEXT_CONTENT,
      firstButtonClassName: "btn btn-error",
      secondButtonClassName: "btn",
      firstButtonText: APP_CONSTANTS.DELETE,
      secondButtonText: APP_CONSTANTS.CANCEL,
      firstButtonOnClick: () => {
        deleteCurrentNotebook();
        setDeletingNotebook(true);
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
      },
      secondButtonOnClick: () =>
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close(),
    });
    document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
  }

  return (
    <div
      className="mt-2 w-full bg-base-100 rounded-lg p-4 select-none cursor-pointer flex items-center justify-between gap-10"
      onClick={handleNotebookClick}
    >
      {/* Name */}
      <div className="max-w-lg text-xl break-words" title={notebookObject.name}>
        {notebookObject.name}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 items-center overflow-hidden">
        {notebookObject.tags.length === 0 ? (
          <p className="text-secondary">{APP_CONSTANTS.NO_TAGS}</p>
        ) : null}
        {notebookObject.tags.slice(0, 10).map((tag, index) => (
          <Tag
            key={index}
            tagText={tag}
            showTagIcon={false}
            source={APP_CONSTANTS.SOURCE_NOTEBOOK}
          />
        ))}
        {notebookObject.tags.length > 10 && (
          <Tag
            key="more"
            moreTag={true}
            tagText={`${notebookObject.tags.length - 10} more`}
          />
        )}
      </div>

      {/* Created Date */}
      <div className="whitespace-nowrap text-secondary text-sm text-center">
        {formatDateDDMMYY(objectToDate(notebookObject.creationDate))}
      </div>

      {/* Last Edited */}
      <div className="whitespace-nowrap text-secondary text-sm text-center">
        {dateDistanceFromNow(objectToDate(notebookObject.lastEditDate))}
      </div>

      {/* Actions */}
      <div className={"flex gap-2"}>
        <div
          className="tooltip"
          data-tip={
            notebookObject.pinned ? "Unpin from dashboard" : "Pin to dashboard"
          }
        >
          <button
            className="btn btn-square"
            disabled={updatingPin}
            onClick={(e) => {
              e.stopPropagation();
              handleNotebookPinAndUnpin(notebookObject.id);
            }}
          >
            {updatingPin ? (
              <span className="loading loading-spinner"></span>
            ) : notebookObject.pinned ? (
              <PinOff size={20} />
            ) : (
              <Pin size={20} />
            )}
          </button>
        </div>

        <div className="tooltip" data-tip="Edit details">
          <button
            className="btn btn-square"
            onClick={handleNotebookEditButtonClick}
          >
            <FileEdit size={20} />
          </button>
        </div>

        <div className="tooltip tooltip-error" data-tip="Delete notebook">
          <button
            className="btn btn-square text-error"
            disabled={deletingNotebook}
            onClick={handleDeleteButtonClick}
          >
            {deletingNotebook ? (
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

export default TableNotebook;
